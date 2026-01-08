import pandas as pd

def predict_sla_breach(csv_path, output_path):
    """
    Predicts SLA breach risk based on call behavior
    """

    df = pd.read_csv(csv_path)

    risks = []

    for _, row in df.iterrows():
        risk_score = 0

        # Time since last call vs SLA
        if row["last_contact_days"] > row["sla_limit_days"]:
            risk_score += 2
        elif row["last_contact_days"] > row["sla_limit_days"] * 0.7:
            risk_score += 1

        # Failed attempts
        if row["failed_attempts"] >= 3:
            risk_score += 2
        elif row["failed_attempts"] >= 1:
            risk_score += 1

        # Customer response
        if row["response_status"] == "No Response":
            risk_score += 2

        # Risk classification
        if risk_score >= 5:
            risks.append("High")
        elif risk_score >= 3:
            risks.append("Medium")
        else:
            risks.append("Low")

    df["sla_risk"] = risks

    # Save output to CSV
    df.to_csv(output_path, index=False)

    return df


if __name__ == "__main__":
    input_file = "sla_tracking.csv"
    output_file = "sla_breach_output.csv"

    predict_sla_breach(input_file, output_file)

    print(f"SLA breach prediction saved to {output_file}")
