import json
import pandas as pd
import sys

def prioritize(csv_path):
    df = pd.read_csv(csv_path, encoding="utf-8-sig")

    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    print("DEBUG COLUMNS:", df.columns.tolist(), file=sys.stderr)

    required_columns = {
        "customer_name",
        "address",
        "phone",
        "amount",
        "due_days",
        "status"
    }

    missing = required_columns - set(df.columns)
    if missing:
        print(f"Missing columns: {missing}", file=sys.stderr)
        sys.exit(1)

    df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
    df["due_days"] = pd.to_numeric(df["due_days"], errors="coerce")

    avg_amount = df["amount"].mean()

    def priority_logic(row):
        if row["amount"] >= avg_amount and row["due_days"] <= 15:
            return "High"
        elif row["amount"] >= avg_amount or row["due_days"] <= 30:
            return "Medium"
        else:
            return "Low"

    df["priority"] = df.apply(priority_logic, axis=1)

    output = df[[
        "customer_name",
        "address",
        "phone",
        "amount",
        "due_days",
        "status",
        "priority"
    ]].to_dict(orient="records")

    print(json.dumps(output))  # ✅ ONLY JSON

if __name__ == "__main__":
    prioritize(sys.argv[1])
