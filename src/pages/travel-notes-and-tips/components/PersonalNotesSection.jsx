import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalNotesSection = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Restaurant Recommendations from Hotel Concierge",
      content: "Sushi Jiro - need reservation 2 months ahead\nRamen Ichiran - good for solo dining\nTsukiji Fish Market - go early morning",
      category: "Food",
      createdAt: new Date('2025-07-20'),
      tags: ["restaurants", "sushi", "ramen"],
      pinned: true
    },
    {
      id: 2,
      title: "Shopping Districts to Visit",
      content: "Shibuya - trendy fashion\nHarajuku - unique street style\nGinza - luxury brands\nAkihabara - electronics and anime",
      category: "Shopping",
      createdAt: new Date('2025-07-21'),
      tags: ["shopping", "fashion", "electronics"],
      pinned: false
    },
    {
      id: 3,
      title: "Temple Etiquette Notes",
      content: "Remove hat and sunglasses\nBow before entering\nDon't point feet toward altar\nPhotography rules vary - ask first",
      category: "Culture",
      createdAt: new Date('2025-07-22'),
      tags: ["temples", "etiquette", "culture"],
      pinned: false
    }
  ]);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  });

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const categories = ["General", "Food", "Shopping", "Culture", "Transportation", "Accommodation"];

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        category: newNote.category,
        createdAt: new Date(),
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        pinned: false
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', category: 'General', tags: '' });
      setIsAddingNote(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const startEditing = (note) => {
    setEditingNote({
      ...note,
      tags: note.tags.join(', ')
    });
  };

  const saveEdit = () => {
    if (editingNote.title.trim() && editingNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? {
              ...editingNote,
              tags: editingNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          : note
      ));
      setEditingNote(null);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'text-sunset-orange bg-sunset-orange/10 border-sunset-orange/20',
      'Shopping': 'text-accent bg-accent/10 border-accent/20',
      'Culture': 'text-primary bg-primary/10 border-primary/20',
      'Transportation': 'text-travel-green bg-travel-green/10 border-travel-green/20',
      'Accommodation': 'text-purple-600 bg-purple-600/10 border-purple-600/20',
      'General': 'text-muted-foreground bg-muted/10 border-muted/20'
    };
    return colors[category] || colors['General'];
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
      <div className="flex justify-between items-center">
        <h4 className="font-heading font-semibold text-lg text-foreground">
          Your Personal Notes
        </h4>
        <Button
          variant="default"
          onClick={() => setIsAddingNote(true)}
          iconName="Plus"
          iconPosition="left"
          className="spring-hover"
        >
          Add Note
        </Button>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="bg-card rounded-xl p-6 border border-border elevation-1">
          <div className="space-y-4">
            <Input
              label="Note Title"
              type="text"
              placeholder="Enter a descriptive title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
            
            <Input
              label="Tags (comma-separated)"
              type="text"
              placeholder="food, restaurant, recommendation..."
              value={newNote.tags}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
            />
            
            <div className="flex space-x-3">
              <Button variant="default" onClick={addNote}>
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {sortedNotes.map((note) => (
          <div 
            key={note.id}
            className={`bg-card rounded-xl border spring-hover hover:elevation-1 ${
              note.pinned ? 'border-accent/30 bg-accent/5' : 'border-border'
            }`}
          >
            {editingNote && editingNote.id === note.id ? (
              // Edit Mode
              <div className="p-6 space-y-4">
                <Input
                  label="Title"
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                />
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={editingNote.category}
                    onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content
                  </label>
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                
                <Input
                  label="Tags"
                  type="text"
                  value={editingNote.tags}
                  onChange={(e) => setEditingNote({ ...editingNote, tags: e.target.value })}
                />
                
                <div className="flex space-x-3">
                  <Button variant="default" onClick={saveEdit}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingNote(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {note.pinned && (
                        <Icon name="Pin" size={16} className="text-accent" />
                      )}
                      <h5 className="font-medium text-foreground">{note.title}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {note.createdAt.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(note.id)}
                      className={`w-8 h-8 ${note.pinned ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
                    >
                      <Icon name="Pin" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(note)}
                      className="w-8 h-8 text-muted-foreground hover:text-primary"
                    >
                      <Icon name="Edit3" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNote(note.id)}
                      className="w-8 h-8 text-muted-foreground hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {note.content}
                  </p>
                </div>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {notes.length === 0 && !isAddingNote && (
        <div className="text-center py-12">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium text-foreground mb-2">No notes yet</h4>
          <p className="text-muted-foreground mb-4">
            Start capturing your travel insights and personal observations
          </p>
          <Button
            variant="default"
            onClick={() => setIsAddingNote(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Create Your First Note
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalNotesSection;