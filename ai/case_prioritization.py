import pandas as pd
import sys
import json

def prioritize(csv_path):
    df = pd.read_csv(csv_path, encoding="utf-8-sig")

    # Normalize column names
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    print("DEBUG COLUMNS:", df.columns.tolist(), file=sys.stderr)

    # 🔁 Flexible mapping
    if "due_days" not in df.columns:
        if "overdue_days" in df.columns:
            df.rename(columns={"overdue_days": "due_days"}, inplace=True)
        elif "days_overdue" in df.columns:
            df.rename(columns={"days_overdue": "due_days"}, inplace=True)

    required_columns = {"amount", "due_days"}
    missing = required_columns - set(df.columns)

    if missing:
        raise Exception(f"Missing columns: {missing}")

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

    print(df.to_json(orient="records"))

if __name__ == "__main__":
    prioritize(sys.argv[1])
