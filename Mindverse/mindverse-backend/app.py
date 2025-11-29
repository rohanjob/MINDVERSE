from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# MongoDB Configuration
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
DB_NAME = 'mindverse_db'

# Initialize MongoDB client
try:
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    print(f"✅ Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print(f"❌ MongoDB Connection Error: {e}")
    db = None

# Collections
stories_collection = db['stories'] if db else None
temples_collection = db['temples'] if db else None
stotrams_collection = db['stotrams'] if db else None
users_collection = db['users'] if db else None

# Helper function to serialize MongoDB documents
def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# ========================
# STORIES ENDPOINTS
# ========================

@app.route('/api/stories', methods=['GET'])
def get_stories():
    """Get all stories"""
    try:
        stories = list(stories_collection.find())
        return jsonify([serialize_doc(story) for story in stories]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stories/<story_id>', methods=['GET'])
def get_story(story_id):
    """Get a specific story by ID"""
    try:
        story = stories_collection.find_one({'_id': ObjectId(story_id)})
        if story:
            return jsonify(serialize_doc(story)), 200
        return jsonify({'error': 'Story not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stories', methods=['POST'])
def create_story():
    """Create a new story"""
    try:
        data = request.json
        data['created_at'] = datetime.utcnow()
        result = stories_collection.insert_one(data)
        return jsonify({'id': str(result.inserted_id), 'message': 'Story created'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========================
# TEMPLES ENDPOINTS
# ========================

@app.route('/api/temples', methods=['GET'])
def get_temples():
    """Get all temples"""
    try:
        temples = list(temples_collection.find())
        return jsonify([serialize_doc(temple) for temple in temples]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/temples/<temple_id>', methods=['GET'])
def get_temple(temple_id):
    """Get a specific temple by ID"""
    try:
        temple = temples_collection.find_one({'_id': ObjectId(temple_id)})
        if temple:
            return jsonify(serialize_doc(temple)), 200
        return jsonify({'error': 'Temple not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/temples', methods=['POST'])
def create_temple():
    """Create a new temple entry"""
    try:
        data = request.json
        data['created_at'] = datetime.utcnow()
        result = temples_collection.insert_one(data)
        return jsonify({'id': str(result.inserted_id), 'message': 'Temple created'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========================
# STOTRAMS ENDPOINTS
# ========================

@app.route('/api/stotrams', methods=['GET'])
def get_stotrams():
    """Get all stotrams"""
    try:
        stotram_type = request.args.get('type')  # Filter by type (tandava, bhairava, vishnu)
        query = {'type': stotram_type} if stotram_type else {}
        stotrams = list(stotrams_collection.find(query))
        return jsonify([serialize_doc(stotram) for stotram in stotrams]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stotrams/<stotram_id>', methods=['GET'])
def get_stotram(stotram_id):
    """Get a specific stotram by ID"""
    try:
        stotram = stotrams_collection.find_one({'_id': ObjectId(stotram_id)})
        if stotram:
            return jsonify(serialize_doc(stotram)), 200
        return jsonify({'error': 'Stotram not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========================
# USER INTERACTIONS
# ========================

@app.route('/api/users/favorites', methods=['POST'])
def add_favorite():
    """Add item to user's favorites"""
    try:
        data = request.json
        user_id = data.get('user_id')
        item_id = data.get('item_id')
        item_type = data.get('item_type')  # 'story', 'temple', or 'stotram'
        
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$addToSet': {
                    'favorites': {
                        'item_id': item_id,
                        'item_type': item_type,
                        'added_at': datetime.utcnow()
                    }
                }
            },
            upsert=True
        )
        return jsonify({'message': 'Added to favorites'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========================
# HEALTH CHECK
# ========================

@app.route('/api/health', methods=['GET'])
def health_check():
    """API Health Check"""
    db_status = 'connected' if db else 'disconnected'
    return jsonify({
        'status': 'healthy',
        'database': db_status,
        'timestamp': datetime.utcnow().isoformat()
    }), 200

@app.route('/', methods=['GET'])
def home():
    """API Home"""
    return jsonify({
        'message': 'Welcome to MindVerse API',
        'version': '1.0.0',
        'description': 'Epic Spiritual Devotional Platform API',
        'endpoints': {
            'stories': '/api/stories',
            'temples': '/api/temples',
            'stotrams': '/api/stotrams',
            'health': '/api/health'
        }
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
