import React, { useMemo, useState } from 'react';
import { Form, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router';
import ReactSelect from 'react-select';
import { Note, Tag } from '../App';
import { NoteCard } from './NoteCard';
import { EditTagsModal } from './EditTagsModal';

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (tagId: string, label: string) => void;
  removeTag: (tagId: string) => void;
};

export function NoteList({ availableTags, notes, updateTag, removeTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))) // check if note has all of the tags that we are searching for
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setIsEditTagsModalOpen(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        availableTags={availableTags}
        show={isEditTagsModalOpen}
        handleClose={() => setIsEditTagsModalOpen(false)}
        updateTag={updateTag}
        removeTag={removeTag}
      />
    </>
  );
}
