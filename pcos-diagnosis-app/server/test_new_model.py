import os
import joblib
import numpy as np

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load the model and scaler
model_path = os.path.join(current_dir, 'logistic_selected_model.pkl')
scaler_path = os.path.join(current_dir, 'scaler_selected_model.pkl')
model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

print("Loaded model and scaler successfully")
print(f"Model type: {type(model).__name__}")

# Create sample data for testing
# Format: free_testosterone, dheas, fsh
sample_data = [
    # Likely PCOS case (high free testosterone, high DHEAS, normal FSH)
    [7.5, 450, 10.0],
    # Likely non-PCOS case (normal hormone levels)
    [2.5, 200, 15.0],
    # Borderline case
    [5.0, 380, 8.5]
]

print("\nTesting model with sample data:")
print("Free Testosterone | DHEAS | FSH | Prediction | Probability | Decision Function")
print("-" * 85)

for i, data in enumerate(sample_data):
    # Make a prediction
    X = np.array([data])
    
    # Scale the data
    X_scaled = scaler.transform(X)
    
    # Get prediction
    prediction = model.predict(X_scaled)[0]
    
    # Get probability
    probability = model.predict_proba(X_scaled)[0]
    
    # Get decision function value
    decision = model.decision_function(X_scaled)[0]
    
    print(f"{data[0]:16.1f} | {data[1]:5.0f} | {data[2]:3.1f} | {'PCOS' if prediction==1 else 'Normal':10} | {probability[1]:10.4f} | {decision:10.4f}")

# Print model coefficients
print("\nModel Coefficients (Feature Importance):")
print(f"Free Testosterone: {model.coef_[0][0]:.4f}")
print(f"DHEAS: {model.coef_[0][1]:.4f}")
print(f"FSH: {model.coef_[0][2]:.4f}")
print(f"Intercept: {model.intercept_[0]:.4f}")

print("\nModel successfully tested!") 