from flask import Flask, render_template, request, redirect, session
import mysql.connector
import bcrypt as bc

app = Flask(__name__)
app.secret_key = 'your_secret_key'
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="e_commerce_db"
)



@app.route('/')
def index():
    if 'user_id' in session:
        user_id = session['user_id']
        cursor = db.cursor()
        cursor.execute("SELECT * FROM user_data WHERE user_id = %s", (user_id,))
        user_data = cursor.fetchone()
        return render_template('default.html', logged_in=True, user_data=user_data)
    else:
        return render_template('index.html', logged_in=False)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        if password == confirm_password:
            cursor = db.cursor()
            bytes = password.encode('utf-8') 
            salt = bc.gensalt() 
            hash = bc.hashpw(bytes, salt) 
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hash))
            db.commit()
            return redirect('/login')
        else:
            return "Passwords do not match"
    return render_template('signin.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cursor = db.cursor()
        bytes = password.encode('utf-8')
        salt = bc.gensalt() 
        hash = bc.hashpw(bytes, salt) 
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, hash))
        user = cursor.fetchone()
        if user:
            session['user_id'] = user[0]
            return redirect('/')
        else:
            return "Invalid username or password"
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
