from flask import Flask, render_template
import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask_socketio import SocketIO

app = Flask(__name__, template_folder='D:/p/client/Forcasting-Main/templates')
socketio = SocketIO(app)

df = pd.read_csv('D:\dataset\example_wp_log_peyton_manning.csv')

m_prophet = Prophet()
m_prophet.fit(df)

def generate_prophet_forecast_plot():
    future_prophet = m_prophet.make_future_dataframe(periods=365)
    forecast_prophet = m_prophet.predict(future_prophet)
    fig_prophet = m_prophet.plot(forecast_prophet)
    

    buffer_prophet = BytesIO()
    plt.savefig(buffer_prophet, format='png')
    plt.close(fig_prophet)
    plot_data_prophet = base64.b64encode(buffer_prophet.getvalue()).decode('utf-8')

    
    
    return plot_data_prophet

def generate_saturated_min_forecast_plot():
    df_saturated_min = df.copy()
    df_saturated_min['y'] = 10 - df_saturated_min['y']
    df_saturated_min['cap'] = 6
    df_saturated_min['floor'] = 1.5
    
    m_saturated_min = Prophet(growth='logistic')
    m_saturated_min.fit(df_saturated_min)
    
    future_saturated_min = m_saturated_min.make_future_dataframe(periods=365)
    future_saturated_min['cap'] = 6
    future_saturated_min['floor'] = 1.5
    
    fcst_saturated_min = m_saturated_min.predict(future_saturated_min)
    fig_saturated_min = m_saturated_min.plot(fcst_saturated_min)
    
    
    buffer_saturated_min = BytesIO()
    plt.savefig(buffer_saturated_min, format='png')
    plt.close(fig_saturated_min)
    plot_data_saturated_min = base64.b64encode(buffer_saturated_min.getvalue()).decode('utf-8')
    
    return plot_data_saturated_min


def generate_saturated_max_forecast_plot():
    future_saturated_max = m_prophet.make_future_dataframe(periods=365)
    future_saturated_max['cap'] = 8.5
    
    fcst_saturated_max = m_prophet.predict(future_saturated_max)
    fig_saturated_max = m_prophet.plot(fcst_saturated_max)
    
  
    buffer_saturated_max = BytesIO()
    plt.savefig(buffer_saturated_max, format='png')
    plt.close(fig_saturated_max)
    plot_data_saturated_max = base64.b64encode(buffer_saturated_max.getvalue()).decode('utf-8')
    
    return plot_data_saturated_max

@app.route('/')
def index():
    return render_template('index.html')

# Add a route for real-time updates
@socketio.on('get_update')
def get_update():
    plot_data_prophet = generate_prophet_forecast_plot()
    plot_data_saturated_min = generate_saturated_min_forecast_plot()
    plot_data_saturated_max = generate_saturated_max_forecast_plot()

    socketio.emit('update', {
        'plot_data_prophet': plot_data_prophet,
        'plot_data_saturated_min': plot_data_saturated_min,
        'plot_data_saturated_max': plot_data_saturated_max
    })

if __name__ == '__main__':
    socketio.run(app, debug=True)
