import re

# ─────────────────────────────────────────────
# SCAM DETECTION AI MODEL
# This file contains all the intelligence
# that decides if a message is a scam or not
# ─────────────────────────────────────────────


# List of words commonly found in scam messages
SCAM_KEYWORDS = [
    # Urgency words
    "urgent", "immediately", "now", "today", "asap",
    "expires", "last chance", "final notice", "hurry",
    "limited time", "act now", "dont wait", "right away",

    # Account threat words
    "blocked", "suspended", "disabled", "terminated",
    "locked", "deactivated", "account will be",
    "will be closed", "restricted",

    # Action words scammers use
    "verify", "confirm", "validate", "update",
    "click here", "click now", "open link",
    "download now", "install now",

    # Prize/money words
    "winner", "won", "prize", "lottery", "reward",
    "congratulations", "selected", "chosen",
    "claim now", "free gift", "cash prize",
    "you have been", "lucky winner",

    # Sensitive info requests
    "otp", "password", "pin", "cvv",
    "credit card", "debit card", "bank account",
    "aadhaar", "pan card", "social security",
    "date of birth", "mother maiden",

    # Common scam phrases
    "dear customer", "dear user", "dear member",
    "your account", "your payment", "your order",
    "refund pending", "kyc pending", "kyc update"
]

# Suspicious URL patterns
SUSPICIOUS_URL_PATTERNS = [
    # Suspicious domain extensions
    ".xyz", ".tk", ".ml", ".ga", ".cf",
    ".gq", ".top", ".work", ".click",

    # Fake bank/service patterns
    "secure-login", "login-secure", "verify-account",
    "account-verify", "bank-secure", "secure-bank",
    "paypal-verify", "amazon-secure", "netflix-login",
    "update-account", "confirm-payment", "refund-claim",

    # IP address instead of domain (suspicious)
    "192.168", "10.0.0", "172.16",
]

# Safe domains (these are always trusted)
SAFE_DOMAINS = [
    "google.com", "amazon.com", "flipkart.com",
    "sbi.co.in", "hdfcbank.com", "icicibank.com",
    "paytm.com", "phonepe.com", "gpay.com",
    "youtube.com", "facebook.com", "instagram.com",
    "github.com", "microsoft.com", "apple.com"
]


def analyze_text(message):
    """
    Analyzes a text message for scam indicators
    Returns: prediction, confidence, reasons
    """
    message_lower = message.lower()
    reasons = []
    score = 0

    # ── Check 1: Scam Keywords ──────────────────────
    found_keywords = [
        kw for kw in SCAM_KEYWORDS
        if kw in message_lower
    ]
    if found_keywords:
        # Show only first 4 keywords to keep it clean
        display_keywords = found_keywords[:4]
        reasons.append(
            f"Suspicious words detected: {', '.join(display_keywords)}"
        )
        score += len(found_keywords) * 10

    # ── Check 2: URLs in message ────────────────────
    urls = re.findall(r'http[s]?://\S+|www\.\S+', message)
    for url in urls:
        url_lower = url.lower()

        # Check if it's a known safe domain
        is_safe = any(safe in url_lower for safe in SAFE_DOMAINS)

        if is_safe:
            score -= 10  # reduce score for safe domains
        else:
            # Check for suspicious patterns
            suspicious = [
                p for p in SUSPICIOUS_URL_PATTERNS
                if p in url_lower
            ]
            if suspicious:
                reasons.append(f"Suspicious URL detected: {url[:50]}")
                score += 35

            # URL is very long = suspicious
            if len(url) > 70:
                reasons.append("Unusually long URL found")
                score += 10

            # Too many dots = suspicious subdomains
            if url.count('.') > 4:
                reasons.append("Suspicious number of subdomains in URL")
                score += 15

    # ── Check 3: Urgency Language ───────────────────
    urgency_words = re.findall(
        r'\b(today|immediately|urgent|now|asap|expires|hurry|'
        r'last chance|final notice|limited time)\b',
        message_lower
    )
    if urgency_words:
        unique_urgency = list(set(urgency_words))
        reasons.append(
            f"Urgent language used: {', '.join(unique_urgency[:3])}"
        )
        score += len(urgency_words) * 8

    # ── Check 4: Sensitive Info Request ─────────────
    sensitive_words = re.findall(
        r'\b(password|otp|cvv|pin|credit card|debit card|'
        r'bank account|aadhaar|pan card|account number)\b',
        message_lower
    )
    if sensitive_words:
        unique_sensitive = list(set(sensitive_words))
        reasons.append(
            f"Requests sensitive information: {', '.join(unique_sensitive)}"
        )
        score += len(sensitive_words) * 20

    # ── Check 5: Prize or Money Promises ────────────
    prize_words = re.findall(
        r'\b(won|winner|prize|lottery|reward|congratulations|'
        r'selected|lucky|claim|free gift|cash)\b',
        message_lower
    )
    if prize_words:
        reasons.append("Promises prize, reward or free money")
        score += 25

    # ── Check 6: Fake Greeting ───────────────────────
    if re.search(r'\b(dear customer|dear user|dear member|dear sir)\b',
                 message_lower):
        reasons.append("Generic greeting used (common in scam messages)")
        score += 10

    # ── Check 7: Message Length ──────────────────────
    # Very short messages with links are suspicious
    if len(message) < 50 and urls:
        reasons.append("Very short message with a link")
        score += 15

    # ── Cap score at 98 ──────────────────────────────
    score = max(0, min(score, 98))

    # ── Final Decision ───────────────────────────────
    if score >= 45:
        prediction = "Scam"
        confidence = score
    elif score >= 20:
        prediction = "Suspicious"
        confidence = score
    else:
        prediction = "Safe"
        confidence = max(90 - score, 70)
        reasons = ["No suspicious patterns detected"]

    return prediction, confidence, reasons


def analyze_url(url):
    """
    Specifically analyzes a URL for phishing
    """
    reasons = []
    score = 0

    url_lower = url.lower()

    # Check safe domains first
    is_safe = any(safe in url_lower for safe in SAFE_DOMAINS)
    if is_safe:
        return "Safe", 95, ["URL belongs to a trusted domain"]

    # Check suspicious patterns
    suspicious = [p for p in SUSPICIOUS_URL_PATTERNS if p in url_lower]
    if suspicious:
        reasons.append(f"Suspicious URL pattern: {', '.join(suspicious[:2])}")
        score += 50

    # Check URL length
    if len(url) > 100:
        reasons.append("Extremely long URL - common phishing technique")
        score += 20

    # Check for @ symbol (trick to hide real destination)
    if "@" in url:
        reasons.append("URL contains @ symbol - possible redirect trick")
        score += 30

    # Check for IP address instead of domain
    if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url):
        reasons.append("URL uses IP address instead of domain name")
        score += 35

    # Check for too many subdomains
    domain_part = url.replace("https://", "").replace("http://", "")
    if domain_part.count('.') > 3:
        reasons.append("Too many subdomains - suspicious structure")
        score += 20

    # Check for misleading keywords in URL
    misleading = re.findall(
        r'(secure|login|verify|account|update|confirm|bank|pay)',
        url_lower
    )
    if misleading:
        reasons.append(
            f"Misleading keywords in URL: {', '.join(set(misleading))}"
        )
        score += 15

    score = min(score, 98)

    if score >= 45:
        return "Scam", score, reasons or ["Multiple phishing indicators found"]
    elif score >= 20:
        return "Suspicious", score, reasons or ["Some suspicious URL patterns"]
    else:
        return "Safe", 85, ["No obvious phishing patterns detected"]

