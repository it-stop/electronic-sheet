from datetime import date, datetime
from enum import Enum


class Role(Enum):
    STUDENT = 1
    TEACHER = 2
    DIRECTOR = 3


class User:
    def __init__(self, uid: int, email: str, first_name: str, middle_name: str, last_name: str, password: str, birth_date: date, entry_date: date, role: Role):
        self.uid = uid
        self.email = email
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.birth_date = birth_date
        self.entry_date = entry_date
        self.role = role
        self.year = datetime.now().year - entry_date.year + 1
        month = datetime.now().month
        if month < 9:
            self.year -= 1
        m_q = [
            3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 2, 2
        ]
        self.quarter = m_q[month - 1]

    def __repr__(self):
        return self.email


class Lesson:
    def __init__(self, uid, name, teacher):
        self.uid = uid
        self.name = name
        self.teacher = teacher


class Mark:
    def __init__(self, year, quarter, mark, teacher, student, lesson):
        self.year = year
        self.quarter = quarter
        self.mark = mark
        self.teacher = teacher
        self.student = student
        self.lesson = lesson

