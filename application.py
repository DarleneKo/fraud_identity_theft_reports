# import dependencies
from FraudReportData import FraudReportData
from flask import Flask, jsonify, render_template

# set up database
data = FraudReportData("sqlite:///fraud_db.db")

# flask setup
app = Flask(__name__)

# routes
@app.route("/")
def welcome():
    return render_template("index.html")


@app.route("/api/v1.0/fraud_reports")
def fraud_report_data():
    fraud_reports = data.get_fraud_reports()
    return jsonify(fraud_reports.to_dict('records'))
  
    
@app.route("/api/v1.0/top_ten")
def top_ten_data():
    top_ten = data.get_top_ten()
    return jsonify(top_ten.to_dict('records'))


@app.route("/api/v1.0/top_ten")
def report_counts_data():
    report_counts = data.get_report_counts()
    return jsonify(report_counts.to_dict('records'))


if __name__ == '__main__':
    app.run(debug=True)