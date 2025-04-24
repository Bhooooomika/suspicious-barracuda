import streamlit as st
import time
import random
from streamlit_js_eval import streamlit_js_eval

st.set_page_config(layout="wide")

# Load external CSS and JS
with open("static/style.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

with open("static/chart.js") as f:
    js_code = f.read()
    streamlit_js_eval(js_expressions=f"""(() => {{
        {js_code}
        window.initSmartChart(); 
    }})()""", key="init-chart")

st.title("⚡ Smart Home Dashboard – Real-time Energy Monitoring")

# Button to simulate real-time update
if st.button("Simulate Data Update"):
    # Random simulated data
    new_value = round(random.uniform(0.5, 5.0), 2)
    streamlit_js_eval(
        js_expressions=f"window.addDataPoint({new_value});",
        key=str(time.time())
    )

# Auto-update every 2 seconds
st.markdown("### Auto-updating every 2s... (simulated)")
placeholder = st.empty()
for _ in range(5):  # Adjust this for longer runs
    new_value = round(random.uniform(0.5, 5.0), 2)
    streamlit_js_eval(
        js_expressions=f"window.addDataPoint({new_value});",
        key=str(time.time())
    )
    time.sleep(2)
