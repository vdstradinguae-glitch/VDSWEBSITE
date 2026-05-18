#!/usr/bin/env python3
"""
Backend API Tests for VDS Trading
Tests all endpoints at /api/[[...path]]/route.js
"""

import requests
import re
import json
from datetime import datetime

# Base URL from .env NEXT_PUBLIC_BASE_URL
BASE_URL = "https://trade-excellence-3.preview.emergentagent.com/api"

# UUID regex pattern
UUID_PATTERN = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', re.IGNORECASE)

def is_valid_uuid(uuid_str):
    """Check if string is a valid UUID v4"""
    return bool(UUID_PATTERN.match(str(uuid_str)))

def is_valid_iso_timestamp(timestamp_str):
    """Check if string is a valid ISO 8601 timestamp"""
    try:
        datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
        return True
    except:
        return False

def test_root_health():
    """Test 1: GET /api/ -> 200 with health response"""
    print("\n" + "="*80)
    print("TEST 1: GET /api/ (root health check)")
    print("="*80)
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"✗ FAILED: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        print(f"✓ Response: {json.dumps(data, indent=2)}")
        
        # Verify structure
        if not data.get('ok'):
            print(f"✗ FAILED: 'ok' field is not true")
            return False
        
        if data.get('service') != 'VDS Trading API':
            print(f"✗ FAILED: Expected service='VDS Trading API', got '{data.get('service')}'")
            return False
        
        if not is_valid_iso_timestamp(data.get('time', '')):
            print(f"✗ FAILED: 'time' is not a valid ISO timestamp: {data.get('time')}")
            return False
        
        print("✓ TEST 1 PASSED: Root health check working correctly")
        return True
        
    except Exception as e:
        print(f"✗ TEST 1 FAILED with exception: {str(e)}")
        return False

def test_health_endpoint():
    """Test 2: GET /api/health -> 200 with health response"""
    print("\n" + "="*80)
    print("TEST 2: GET /api/health")
    print("="*80)
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"✗ FAILED: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        print(f"✓ Response: {json.dumps(data, indent=2)}")
        
        # Verify structure (same as root)
        if not data.get('ok'):
            print(f"✗ FAILED: 'ok' field is not true")
            return False
        
        if data.get('service') != 'VDS Trading API':
            print(f"✗ FAILED: Expected service='VDS Trading API', got '{data.get('service')}'")
            return False
        
        if not is_valid_iso_timestamp(data.get('time', '')):
            print(f"✗ FAILED: 'time' is not a valid ISO timestamp: {data.get('time')}")
            return False
        
        print("✓ TEST 2 PASSED: Health endpoint working correctly")
        return True
        
    except Exception as e:
        print(f"✗ TEST 2 FAILED with exception: {str(e)}")
        return False

def test_contact_valid():
    """Test 3: POST /api/contact with valid data -> 200 with success response"""
    print("\n" + "="*80)
    print("TEST 3: POST /api/contact with valid data")
    print("="*80)
    try:
        payload = {
            "name": "Ahmed Al-Mansoori",
            "email": "ahmed.mansoori@example.ae",
            "phone": "+971-50-123-4567",
            "vertical": "Healthcare",
            "message": "I am interested in your healthcare products and would like to discuss potential partnership opportunities."
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"✗ FAILED: Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
        
        data = response.json()
        print(f"✓ Response: {json.dumps(data, indent=2)}")
        
        # Verify structure
        if not data.get('success'):
            print(f"✗ FAILED: 'success' field is not true")
            return False, None
        
        contact_id = data.get('id')
        if not is_valid_uuid(contact_id):
            print(f"✗ FAILED: 'id' is not a valid UUID: {contact_id}")
            return False, None
        
        if not data.get('message'):
            print(f"✗ FAILED: 'message' field is missing or empty")
            return False, None
        
        print(f"✓ Contact created with UUID: {contact_id}")
        print("✓ TEST 3 PASSED: Contact creation working correctly")
        return True, contact_id
        
    except Exception as e:
        print(f"✗ TEST 3 FAILED with exception: {str(e)}")
        return False, None

def test_contact_missing_fields():
    """Test 4: POST /api/contact with missing required fields -> 400"""
    print("\n" + "="*80)
    print("TEST 4: POST /api/contact with missing required fields")
    print("="*80)
    
    test_cases = [
        {"email": "test@example.com", "message": "Test"},  # Missing name
        {"name": "Test User", "message": "Test"},  # Missing email
        {"name": "Test User", "email": "test@example.com"},  # Missing message
        {},  # Missing all
    ]
    
    all_passed = True
    for i, payload in enumerate(test_cases, 1):
        print(f"\n--- Sub-test 4.{i}: {payload} ---")
        try:
            response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
            print(f"✓ Status Code: {response.status_code}")
            
            if response.status_code != 400:
                print(f"✗ FAILED: Expected 400, got {response.status_code}")
                all_passed = False
                continue
            
            data = response.json()
            print(f"✓ Response: {json.dumps(data, indent=2)}")
            
            expected_error = "name, email, and message are required"
            if data.get('error') != expected_error:
                print(f"✗ FAILED: Expected error message '{expected_error}', got '{data.get('error')}'")
                all_passed = False
                continue
            
            print(f"✓ Sub-test 4.{i} passed")
            
        except Exception as e:
            print(f"✗ Sub-test 4.{i} FAILED with exception: {str(e)}")
            all_passed = False
    
    if all_passed:
        print("\n✓ TEST 4 PASSED: Validation working correctly")
    else:
        print("\n✗ TEST 4 FAILED: Some validation tests failed")
    
    return all_passed

def test_get_contacts(expected_contact_id=None):
    """Test 5: GET /api/contacts -> 200 with items array, verify no _id field"""
    print("\n" + "="*80)
    print("TEST 5: GET /api/contacts")
    print("="*80)
    try:
        response = requests.get(f"{BASE_URL}/contacts", timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"✗ FAILED: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if 'items' not in data:
            print(f"✗ FAILED: Response missing 'items' field")
            print(f"Response: {json.dumps(data, indent=2)}")
            return False
        
        items = data['items']
        print(f"✓ Found {len(items)} contact(s)")
        
        if len(items) == 0:
            print("⚠ WARNING: No contacts found in database")
            if expected_contact_id:
                print(f"✗ FAILED: Expected to find contact with id {expected_contact_id}")
                return False
        
        # Check for _id field (should not be present)
        for i, item in enumerate(items):
            if '_id' in item:
                print(f"✗ FAILED: Item {i} contains '_id' field (should be excluded)")
                print(f"Item: {json.dumps(item, indent=2)}")
                return False
            
            # Verify id is UUID
            if 'id' in item and not is_valid_uuid(item['id']):
                print(f"✗ FAILED: Item {i} has invalid UUID: {item['id']}")
                return False
        
        # If we created a contact, verify it's in the list
        if expected_contact_id:
            found = any(item.get('id') == expected_contact_id for item in items)
            if not found:
                print(f"✗ FAILED: Contact with id {expected_contact_id} not found in list")
                print(f"Available IDs: {[item.get('id') for item in items[:5]]}")
                return False
            print(f"✓ Contact {expected_contact_id} found in list")
        
        # Show first contact as sample
        if items:
            print(f"✓ Sample contact: {json.dumps(items[0], indent=2)}")
        
        print("✓ TEST 5 PASSED: GET /api/contacts working correctly")
        return True
        
    except Exception as e:
        print(f"✗ TEST 5 FAILED with exception: {str(e)}")
        return False

def test_options_cors():
    """Test 6: OPTIONS /api/contact -> 204 with CORS headers"""
    print("\n" + "="*80)
    print("TEST 6: OPTIONS /api/contact (CORS preflight)")
    print("="*80)
    try:
        response = requests.options(f"{BASE_URL}/contact", timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 204:
            print(f"✗ FAILED: Expected 204, got {response.status_code}")
            return False
        
        # Check CORS headers
        headers = response.headers
        print(f"✓ Response Headers:")
        for key in ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']:
            value = headers.get(key, 'NOT FOUND')
            print(f"  {key}: {value}")
        
        if headers.get('Access-Control-Allow-Origin') != '*':
            print(f"✗ FAILED: Expected Access-Control-Allow-Origin: *, got {headers.get('Access-Control-Allow-Origin')}")
            return False
        
        print("✓ TEST 6 PASSED: CORS preflight working correctly")
        return True
        
    except Exception as e:
        print(f"✗ TEST 6 FAILED with exception: {str(e)}")
        return False

def test_unknown_path():
    """Test 7: GET /api/some-unknown-path -> 404"""
    print("\n" + "="*80)
    print("TEST 7: GET /api/some-unknown-path (404 handling)")
    print("="*80)
    try:
        response = requests.get(f"{BASE_URL}/some-unknown-path", timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        
        if response.status_code != 404:
            print(f"✗ FAILED: Expected 404, got {response.status_code}")
            return False
        
        data = response.json()
        print(f"✓ Response: {json.dumps(data, indent=2)}")
        
        if data.get('error') != 'Not found':
            print(f"✗ FAILED: Expected error='Not found', got '{data.get('error')}'")
            return False
        
        if data.get('path') != 'some-unknown-path':
            print(f"✗ FAILED: Expected path='some-unknown-path', got '{data.get('path')}'")
            return False
        
        print("✓ TEST 7 PASSED: 404 handling working correctly")
        return True
        
    except Exception as e:
        print(f"✗ TEST 7 FAILED with exception: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("VDS TRADING BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {}
    
    # Test 1: Root health
    results['test_1_root_health'] = test_root_health()
    
    # Test 2: Health endpoint
    results['test_2_health_endpoint'] = test_health_endpoint()
    
    # Test 3: Create contact (valid)
    success, contact_id = test_contact_valid()
    results['test_3_contact_valid'] = success
    
    # Test 4: Create contact (invalid - missing fields)
    results['test_4_contact_validation'] = test_contact_missing_fields()
    
    # Test 5: Get contacts (verify persistence)
    results['test_5_get_contacts'] = test_get_contacts(contact_id)
    
    # Test 6: OPTIONS CORS
    results['test_6_options_cors'] = test_options_cors()
    
    # Test 7: Unknown path 404
    results['test_7_unknown_path'] = test_unknown_path()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✓ PASSED" if result else "✗ FAILED"
        print(f"{status}: {test_name}")
    
    print("="*80)
    print(f"TOTAL: {passed}/{total} tests passed")
    print("="*80)
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠ {total - passed} test(s) failed. Please review the output above.")
        return 1

if __name__ == "__main__":
    exit(main())
