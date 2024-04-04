from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="testdatabase"
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        name = request.form['name']
        id = request.form['id']
        mycursor = db.cursor()
        sql = "INSERT INTO testtable (name, id) VALUES (%s, %s)"
        val = (name, id)
        mycursor.execute(sql, val)
        db.commit()

        return redirect(url_for('index'))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/table')
def table():
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM testtable")
    data = mycursor.fetchall()
    return render_template('table.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
