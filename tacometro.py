import plotly.graph_objects as go

fig = go.Figure(go.Indicator(
    mode = "gauge+number",
    value = 60,
    domain = {'x': [0, 1], 'y': [0, 1]},
    title = {'text': "Impuestos"},
    gauge = {'axis': {'range': [0, 100]}}
    ))

fig.show()