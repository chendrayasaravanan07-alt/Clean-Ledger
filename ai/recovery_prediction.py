# recovery_prediction.py

import pandas as pd
import numpy as np

# -----------------------------
# Step 1: Load CSV
# -----------------------------
input_file = "customer_data.csv"  # replace with your CSV filename
df = pd.read_csv(input_file)

# Ensure required columns exist
required_cols = ['customer_name', 'amount', 'due_days', 'past_contact_attempts', 'response_status']
for col in required_cols:
    if col not in df.columns:
        raise ValueError(f"Missing required column: {col}")

# -----------------------------
# Step 2: Encode response_status
# -----------------------------
# Map responses to numerical values for probability calculation
response_mapping = {
    "responsive": 1.0,
    "partially_responsive": 0.5,
    "not_responsive": 0.1
}
df['response_score'] = df['response_status'].map(response_mapping).fillna(0.1)

# -----------------------------
# Step 3: Calculate recovery probability
# -----------------------------
# Weighted formula:
#   - More contact attempts increase chance up to a point
#   - More overdue days decrease probability
#   - Customer responsiveness has highest weight

df['recovery_probability'] = (
    0.5 * df['response_score'] + 
    0.3 * np.tanh(df['past_contact_attempts'] / 5) +  # normalize attempts
    0.2 * np.exp(-df['due_days'] / 30)  # overdue reduces probability
)

# Clamp probabilities to [0,1]
df['recovery_probability'] = df['recovery_probability'].clip(0, 1)

# -----------------------------
# Step 4: Save output
# -----------------------------
output_file = "customer_data_with_recovery.csv"
df.to_csv(output_file, index=False)
print(f"Recovery probabilities saved to {output_file}")
