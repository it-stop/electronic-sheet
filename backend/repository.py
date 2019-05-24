from models import User, Role, Lesson, Mark
from datetime import date
from mysql import connector


class Repository:
    def __init__(self, conn: connector):
        self.conn = conn

    def add_user(self, email: str, first_name: str, middle_name: str, last_name: str, password: str, birth_date: date, entry_date: date, role: Role):
        q = 'INSERT INTO users(email, first_name, middle_name, last_name, password, birth_date, entry_date, role) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'
        cursor = self.conn.cursor()
        arg = (email, first_name, middle_name, last_name, password, birth_date, entry_date, role)
        cursor.execute(q, arg)
        self.conn.commit()

    def get_user(self, uid):
        users = self.get_users()
        for user in users:
            if user.uid == int(uid):
                return user
        return None

    def get_users(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM users')
        rows = cursor.fetchall()

        users = []
        for r in rows:
            users.append(User(*r))
        return users

    def add_lesson(self, teacher_id: int, name: str):
        q = 'INSERT INTO lessons(teacher_id, name) VALUES (%s, %s)'
        cursor = self.conn.cursor()
        arg = (teacher_id, name)
        cursor.execute(q, arg)
        self.conn.commit()

    def get_lesson(self, uid):
        lessons = self.get_lessons()
        for lesson in lessons:
            if lesson.uid == int(uid):
                return lesson
        return None

    def get_lessons(self):
        cursor = self.conn.cursor()
        cursor.execute('select l.id, l.name, u.id, u.email, u.first_name, u.middle_name, u.last_name, u.password, u.birth_date, u.entry_date, u.role from lessons as l, users as u where teacher_id=u.id;')
        rows = cursor.fetchall()
        lessons = []
        for r in rows:
            teacher = User(*r[2:])
            lessons.append(Lesson(*r[:2], teacher))
        return lessons

    def add_year_lesson(self, year, quarter, lesson_id):
        q = 'INSERT INTO years_lessons(year, quarter, lesson_id) VALUES (%s, %s, %s)'
        cursor = self.conn.cursor()
        arg = (year, quarter, lesson_id)
        cursor.execute(q, arg)
        self.conn.commit()

    def add_mark(self, teacher_id, student_id, lesson_id, year, quarter, mark):
        q = 'INSERT INTO journal(teacher_id, student_id, lesson_id, year, quarter, mark) VALUES (%s, %s, %s, %s, %s, %s)'
        cursor = self.conn.cursor()
        arg = (teacher_id, student_id, lesson_id, year, quarter, mark)
        cursor.execute(q, arg)
        self.conn.commit()

    def get_marks(self):
        cursor = self.conn.cursor()
        cursor.execute(
            'select year, quarter, mark, t.*, s.*, l.id, l.name from journal as j, users as t, users as s, lessons as l where student_id = s.id and j.teacher_id = t.id and lesson_id = l.id')
        rows = cursor.fetchall()
        marks = []
        for r in rows:
            teacher = User(*r[3:12])
            student = User(*r[12:21])
            lesson = Lesson(*r[21:], teacher)
            mark = Mark(*r[:3], teacher, student, lesson)
            marks.append(mark)
        return marks

    def get_token(self, email, password):
        cursor = self.conn.cursor()
        cursor.execute('select * from users where email=%s and password=%s', (email, password))
        rows = cursor.fetchall()
        if len(rows) == 1:
            user = User(*rows[0])
            return str(user.uid) + ':' + password
        raise Exception('incorrect password')
