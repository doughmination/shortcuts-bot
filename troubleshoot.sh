#!/bin/bash

echo "🔍 DotenvX Troubleshooting Check"
echo "=================================="
echo ""

# Check for .env file
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "❌ .env file is missing!"
    exit 1
fi

# Check for .env.vault file
if [ -f ".env.vault" ]; then
    echo "✅ .env.vault file exists (encrypted)"
else
    echo "❌ .env.vault file is missing!"
    echo "   Run: npx dotenvx encrypt"
    exit 1
fi

# Check for .env.keys file
if [ -f ".env.keys" ]; then
    echo "✅ .env.keys file exists"
    
    # Check if it contains the actual key (not the template)
    if grep -q "your_decryption_key_here" .env.keys; then
        echo "⚠️  WARNING: .env.keys still contains template value!"
        echo "   Please add your actual DOTENV_PRIVATE_KEY to .env.keys"
    else
        echo "✅ .env.keys appears to have a real key"
    fi
else
    echo "❌ .env.keys file is missing!"
    echo "   After running 'npx dotenvx encrypt', copy the DOTENV_PRIVATE_KEY to .env.keys"
    exit 1
fi

echo ""
echo "📋 Testing decryption locally..."
echo ""

# Test if dotenvx can decrypt locally
if dotenvx run -- printenv DISCORD_TOKEN > /dev/null 2>&1; then
    echo "✅ Decryption works locally!"
else
    echo "❌ Failed to decrypt locally"
    echo "   Make sure DOTENV_PRIVATE_KEY in .env.keys is correct"
    exit 1
fi

echo ""
echo "🎉 All checks passed!"
echo ""
echo "Next steps:"
echo "1. docker compose build --no-cache"
echo "2. docker compose up -d"
echo "3. docker compose logs -f"