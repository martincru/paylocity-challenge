#!/usr/bin/env python3
import sys
import base64


def generate_basic_auth_token(username: str, password: str) -> str:
    """
    Generates a Basic authentication token
    
    Args:
        username: Username
        password: Password
        
    Returns:
        Token in Base64 format
    """
    credentials = f"{username}:{password}"
    token = base64.b64encode(credentials.encode()).decode()
    return token


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_token.py <username> <password>")
        print("\nExample:")
        print("  python generate_token.py TestUser123 MyPassword")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    
    token = generate_basic_auth_token(username, password)
    
    print("\n" + "="*60)
    print("BASIC AUTHENTICATION TOKEN GENERATED")
    print("="*60)
    print(f"\nUsername: {username}")
    print(f"Password: {password}")
    print(f"\nToken:    {token}")
    print("\n" + "="*60)
    print("\nAdd this line to your .env file:")
    print(f"API_AUTH_TOKEN={token}")
    print("="*60 + "\n")
