from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy  # SQLAlchemy support PostgreSQL databases
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' # Development database change it to refer into your own database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)


class Date(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_start = db.Column(db.String(50))
    date_end = db.Column(db.String(50))
    diffrence = db.Column(db.String(50))

    def __repr__(self):
        return f'<Date {self.date_start} {self.date_end} {self.diffrence}>'


class DateSchema(ma.Schema):
    class Meta:
        fields = ("id", "date_start", "date_end","diffrence")

date_schema = DateSchema()
dates_schema = DateSchema(many=True)


class DateListResource(Resource):
    def get(self):
        dates = Date.query.all()
        return dates_schema.dump(dates), 200

    def post(self):
        new_date = Date(
            date_start=request.json['date_start'],
            date_end=request.json['date_end'],
            diffrence=request.json['diffrence']
        )
        db.session.add(new_date)
        db.session.commit()
        return date_schema.dump(new_date), 201

class DateResource(Resource):
    def get(self, date_id):
        date = Date.query.get_or_404(date_id)
        return date_schema.dump(date)

    def patch(self, date_id):
        date = Date.query.get_or_404(date_id)

        if 'date_start' in request.json:
            date.date_start = request.json['date_start']
        if 'date_end' in request.json:
            date.date_end = request.json['date_end']
        if 'diffrence' in request.json:
            date.diffrence = request.json['diffrence']

        db.session.commit()
        return date_schema.dump(date)

    def delete(self, date_id):
        date = Date.query.get_or_404(date_id)
        db.session.delete(date)
        db.session.commit()
        return 'f{date_id}', 204


api.add_resource(DateListResource, '/dates')
api.add_resource(DateResource, '/dates/<int:date_id>')


if __name__ == '__main__':
    #db.create_all()  #uncomment this line if you run this for the first time
    app.run(debug=True)
