# import dependencies
from FraudReportData import FraudReportData
from flask import Flask, jsonify, render_template

# set up database
data = FraudReportData("sqlite:///fraud.db")

# flask setup
app = Flask(__name__)

# routes
@app.route("/")
def welcome():
    fraud_reports = data.get_fraud_reports()
    top_ten = data.get_top_ten()
    return render_template("index.html")



@app.route("/api/v1.0/fraud_reports")
def fraud_report_data():
    return jsonify(fraud_reports)



@app.route("/api/v1.0/top_ten")
def top_ten_data():
    return jsonify(top_ten)





if __name__ == '__main__':
    app.run(debug=True)