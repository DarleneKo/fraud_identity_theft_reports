# import dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table

class FraudReportData():

# connect to sqlite database
    def __init__(self, connect_string):
        self.engine = create_engine(connect_string)
        self.connect_string = connect_string
        self.inspector = inspect(self.engine)
        self.tables = self.inspector.get_table_names()
        self.Base = automap_base()
        self.Base.prepare(self.engine, reflect=True)
        self.fraud_reports = self.Base.classes['fraud_reports']
        self.top_ten = self.Base.classes['top_ten']
        self.report_counts = self.Base.classes['report_counts']
        self.state_rankings = self.Base.classes['state_rankings']

# inspect tables 
    def display_db_info(self):
        inspector = inspect(self.engine)
        tables = self.inspector.get_table_names()
        for table in self.tables:
            print("\n")
            print('-' * 12)
            print(f"table '{table}' has the following columns:")
            print('-' * 12)
            for column in self.inspector.get_columns(table):
                print(f"name: {column['name']}   column type: {column['type']}")


    def get_fraud_reports(self):
        session = Session(self.engine)

        results = session.query(self.fraud_reports)

        fraud_reports_df = pd.read_sql(results.statement, session.connection())

        session.close()
        return fraud_reports_df


    def get_top_ten(self):
        session = Session(self.engine)

        results = session.query(self.top_ten)

        top_ten_df = pd.read_sql(results.statement, session.connection())

        session.close()
        return top_ten_df


    def get_report_counts(self):
        session = Session(self.engine)

        results = session.query(self.report_counts)

        report_counts_df = pd.read_sql(results.statement, session.connection())

        session.close()
        return report_counts_df


    def get_state_rankings(self):
        session = Session(self.engine)

        results = session.query(self.state_rankings)

        state_rankings_df = pd.read_sql(results.statement, session.connection())

        session.close()
        return state_rankings_df

if __name__ == '__main__':
    info = FraudReportData("sqlite:///fraud_db.db")
    # info.display_db_info()
    # print("\nFraud Report DF:\n", info.get_fraud_reports())
    # print("\nTop Ten DF:\n", info.get_top_ten())
    # print("\nReport Counts DF:\n", info.get_report_counts())
    print("\nState Rankings DF:\n", info.get_state_rankings())