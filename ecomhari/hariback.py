import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="testdatabase"
)

mycursor = db.cursor()

#mycursor.execute("CREATE TABLE testtable(name varchar(20) , id int , person_id int PRIMARY KEY)")
#mycursor.execute("INSERT INTO testtable(name,id) VALUES (%s,%s)" , ("ADI",92))
#db.commit()
mycursor.execute("SELECT * FROM testtable")

for x in mycursor:
    print(x)