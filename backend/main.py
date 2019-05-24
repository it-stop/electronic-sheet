from datetime import date
from mysql import connector
from repository import Repository
from json import JSONEncoder
from flask import Flask, request

app = Flask(__name__)
rep = None
json = JSONEncoder()


class MyEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, date):
            return dict(year=o.year, month=o.month, day=o.day)
        return o.__dict__


@app.route('/')
def hello():
    return "Hello World"


@app.route('/login')
def login():
    email = request.args['email']
    password = request.args['password']
    return rep.get_token(email, password)


@app.route('/get_users')
def get_users():
    return app.response_class(
        response=MyEncoder().encode(rep.get_users()),
        status=200,
        mimetype='application/json'
    )


@app.route('/get_user/<uid>')
def get_user(uid):
    return app.response_class(
        response=MyEncoder().encode(rep.get_user(uid)),
        status=200,
        mimetype='application/json'
    )


# example: http://127.0.0.1:5000/add_user?email=a@a.ru&first_name=A&middle_name=B&last_name=C&password=P&birth_date=1997-01-03&entry_date=2015-09-01&role=1
@app.route('/add_user')
def add_user():
    a = request.args
    rep.add_user(a['email'], a['first_name'], a['middle_name'], a['last_name'], a['password'], a['birth_date'], a['entry_date'], a['role'])
    return 'ok'


# example: http://127.0.0.1:5000/add_lesson?teacher_id=12&name=%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0
@app.route('/add_lesson')
def add_lesson():
    rep.add_lesson(request.args['teacher_id'], request.args['name'])
    return 'ok'


@app.route('/get_lessons')
def get_lessons():
    return app.response_class(
        response=MyEncoder().encode(rep.get_lessons()),
        status=200,
        mimetype='application/json'
    )


@app.route('/get_lesson/<uid>')
def get_lesson(uid):
    return app.response_class(
        response=MyEncoder().encode(rep.get_lesson(uid)),
        status=200,
        mimetype='application/json'
    )


@app.route('/add_year_lesson')
def add_year_lesson():
    rep.add_year_lesson(request.args['year'], request.args['quarter'], request.args['lesson_id'])
    return 'ok'


# example: http://localhost:5000/add_mark?teacher_id=12&student_id=11&lesson_id=1&year=2&quarter=1&mark=4
@app.route('/add_mark')
def add_mark():
    rep.add_mark(request.args['teacher_id'], request.args['student_id'], request.args['lesson_id'], request.args['year'], request.args['quarter'], request.args['mark'])
    return 'ok'


@app.route('/get_marks')
def get_marks():
    return app.response_class(
        response=MyEncoder().encode(rep.get_marks()),
        status=200,
        mimetype='application/json'
    )


if __name__ == "__main__":
    conn = connector.connect(host='localhost',
                             database='school',
                             user='root',
                             password='iziparol')
    if conn.is_connected():
        rep = Repository(conn)
        app.run()
    else:
        print('can\' connect to mysql database')
