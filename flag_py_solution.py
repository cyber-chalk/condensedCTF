def decrypt_cipher(cipher_text):
    decrypted_chars = []
    
    # Iterate through each character in the cipher text
    for i, char in enumerate(cipher_text):
        ascii_val = ord(char)
        
        # Calculate the reverse of the shift based on position
        shift = (i + 1)  # The shift increases by 1, 2, 3, ...
        
        if i % 2 == 0:  # Even indices: subtract shift (since these were originally increased)
            decrypted_val = ascii_val + shift
        else:  # Odd indices: add shift (since these were originally decreased)
            decrypted_val = ascii_val - shift
        
        # Ensure that the decrypted value is within the valid range of 33 to 126
        # If it goes out of range, wrap around within the range 33 to 126
        if decrypted_val <= 33:
            decrypted_val = 126 - (33 - decrypted_val)
        elif decrypted_val >= 126:
            decrypted_val = 33 + (decrypted_val - 126)
        
        decrypted_chars.append(chr(decrypted_val))
    
    # Join the decrypted characters into a single string
    return ''.join(decrypted_chars)

# Cipher text
cipher_text = "FqlhZPhjV&d$R$`|ewQs_!NwJ&U'H3l\"'*O,_<8??245?28j.00F9=.I*B)\"t'F6k1p,\\os"

# Decrypt the cipher text
decrypted_text = decrypt_cipher(cipher_text)
print("Decrypted text:", decrypted_text)
