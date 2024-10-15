# app/app.py
from flask import Flask, request
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="db",  # service name from docker-compose.yml
        user="root",
        password="rootpassword",
        database="ctf_db"
    )

@app.route('/')
def home():
    return '''
        <form method="POST" action="/login">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
    '''

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # Vulnerable SQL query (SQL Injection)
    connection = get_db_connection()
    cursor = connection.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)
    
    result = cursor.fetchone()
    if result:
        return f"Welcome, {username}!"
    else:
        return "Invalid credentials!", 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
