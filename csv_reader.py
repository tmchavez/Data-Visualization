import pandas as pd

def get_values_all_file(filename):
	
	df = csv_to_dataframe(filename)
	return get_values_all(df)

def csv_to_dataframe(filename):

	df = pd.read_csv(filename)
	return df

def get_values_all(df):
	
	headers = get_csv_headers(df)
	values_list = []
	for column in headers:
		column_values_list = get_values_column(df, column)
		values_list.append((column, column_values_list))
	
	return values_list

def get_csv_headers(df):

	return list(df)

def get_values_column(df, header):
	
	return df[header]

if __name__ == "__main__":
	values = get_values_all_file("Batch_3104452_batch_results.csv")
	for value in values:
		print(value)