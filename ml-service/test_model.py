from model import analyze_text, analyze_url

print("🧪 Testing ScamShield AI Model...")
print("=" * 50)

# Test messages
tests = [
    {
        "message": "Your bank account will be blocked today. Verify immediately: http://bank-secure-login.xyz",
        "expected": "Scam"
    },
    {
        "message": "Congratulations! You have won a cash prize of Rs 50,000. Click here to claim now!",
        "expected": "Scam"
    },
    {
        "message": "Enter your OTP and password to confirm your account",
        "expected": "Scam"
    },
    {
        "message": "Hi Sachin, your Amazon order has been shipped. Track at amazon.com",
        "expected": "Safe"
    },
    {
        "message": "Meeting at 3pm today in conference room B",
        "expected": "Safe"
    },
    {
        "message": "Dear customer, your KYC is pending",
        "expected": "Suspicious"
    }
]

# Run all tests
passed = 0
for i, test in enumerate(tests):
    prediction, confidence, reasons = analyze_text(test["message"])
    status = "✅ PASS" if prediction == test["expected"] else "❌ FAIL"
    if prediction == test["expected"]:
        passed += 1

    print(f"\nTest {i+1}: {status}")
    print(f"Message : {test['message'][:60]}...")
    print(f"Expected: {test['expected']}")
    print(f"Got     : {prediction} ({confidence}%)")
    print(f"Reasons : {reasons[0] if reasons else 'None'}")

print("\n" + "=" * 50)
print(f"Results: {passed}/{len(tests)} tests passed")

# Test URL detection
print("\n🔗 Testing URL Detection...")
print("=" * 50)

url_tests = [
    ("http://bank-secure-login.xyz/verify", "Scam"),
    ("http://amazon.com/orders", "Safe"),
    ("http://paypal-account-verify.tk", "Scam"),
]

for url, expected in url_tests:
    prediction, confidence, reasons = analyze_url(url)
    status = "✅" if prediction == expected else "❌"
    print(f"{status} URL: {url[:45]}...")
    print(f"   Result: {prediction} ({confidence}%)")
