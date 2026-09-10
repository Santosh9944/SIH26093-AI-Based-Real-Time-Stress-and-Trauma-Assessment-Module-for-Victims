"""
Automated Pytest Suite for SIH26093 FastAPI Microservice
Title: AI-Based Real-Time Stress and Trauma Assessment Module for NHAA (14566)
"""

import os
import sys
import importlib.util
import pytest
from fastapi.testclient import TestClient

app_path = os.path.join(os.path.dirname(__file__), "app.py")
spec = importlib.util.spec_from_file_location("app_sih26093", app_path)
app_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app_module)
app = app_module.app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["problem_id"] == "SIH26093"
    assert data["organization"] == "Ministry of Social Justice and Empowerment (MoSJE)"
    assert data["status"] == "OPERATIONAL"
    assert "timestamp" in data

def test_helpline_stats_endpoint():
    response = client.get("/api/v1/helpline/stats")
    assert response.status_code == 200
    data = response.json()
    assert "active_calls_monitored" in data
    assert "avg_svi_score" in data
    assert "critical_triage_active" in data
    assert data["system_health"] == "OPTIMAL"
    assert "DPDP_ACT_2023" in data["compliance_status"]

def test_legacy_stats_endpoint():
    response = client.get("/api/v1/telemetry/stats")
    assert response.status_code == 200
    data = response.json()
    assert "active_streams" in data
    assert "avg_latency_ms" in data

def test_telemetry_ingest_critical_trauma():
    payload = {
        "call_id": "NHAA-TEST-CRITICAL-01",
        "channel": "14566_VOICE",
        "caller_language": "Hindi",
        "acoustic": {
            "pitch_hz": 340.0,
            "jitter_percent": 4.8,
            "shimmer_percent": 8.5,
            "speech_pause_ratio": 0.55,
            "speech_rate_wpm": 75.0
        },
        "transcript_text": "They attacked our home with weapons and threatened to kill us, I fear for life, no hope to survive"
    }
    response = client.post("/api/v1/telemetry/ingest", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["ps_id"] == "SIH26093"
    assert data["call_id"] == "NHAA-TEST-CRITICAL-01"
    assert data["svi_score"] >= 75.0
    assert data["risk_category"] == "CRITICAL"
    assert data["is_anomaly"] is True
    assert data["extreme_vulnerability_detected"] is True
    assert len(data["recommended_interventions"]) > 0
    assert "sha256_hash" in data

def test_telemetry_ingest_routine_low_risk():
    payload = {
        "call_id": "NHAA-TEST-LOW-02",
        "channel": "PORTAL_CHATBOT",
        "caller_language": "English",
        "acoustic": {
            "pitch_hz": 150.0,
            "jitter_percent": 0.8,
            "shimmer_percent": 1.2,
            "speech_pause_ratio": 0.1,
            "speech_rate_wpm": 140.0
        },
        "transcript_text": "Inquiring about scholarship application status and routine document verification under the portal"
    }
    response = client.post("/api/v1/assessment/evaluate", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["svi_score"] < 50.0
    assert data["risk_category"] in ["LOW", "MODERATE"]

def test_audit_logs():
    response = client.get("/api/v1/audit/logs")
    assert response.status_code == 200
    data = response.json()
    assert "total_records" in data
    assert data["tamper_evident"] is True
    assert isinstance(data["records"], list)
    assert len(data["records"]) > 0

def test_dispatch_action():
    payload = {
        "event_id": "EVT-776655",
        "call_id": "NHAA-2026-9999",
        "protocol_type": "EMERGENCY_POLICE_AND_WITNESS_PROTECTION",
        "assigned_agency": "SPECIAL_CELL_DISTRICT_SUPERINTENDENT",
        "priority": "EMERGENCY",
        "notes": "Severe violence reported in rural jurisdiction"
    }
    response = client.post("/api/v1/action/dispatch", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["event_id"] == "EVT-776655"
    assert data["protocol_type"] == "EMERGENCY_POLICE_AND_WITNESS_PROTECTION"
    assert "DISPATCHED" in data["status"]
