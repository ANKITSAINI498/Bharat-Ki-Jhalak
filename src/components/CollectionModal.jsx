import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Modal } from "./common";
export default function CollectionModal({ open, onClose, photoId }) {
  const { collections, createCollection, addToCollection } = useApp();
  const [name, setName] = useState("");
  return;
  <Modal open={open} onClose={onClose} title="Add to collection">
    <div className="collection-form">
      <div className="collection-create">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New collection name"
        />
        <button
          className="btn primary"
          onClick={() => {
            if (createCollection(name)) setName("");
          }}
        >
          Create
        </button>
      </div>
      {collections.length === 0 ? (
        <p className="muted">Create your first collection above.</p>
      ) : (
        <div className="collection-list">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                addToCollection(c.id, photoId);
                onClose();
              }}
            >
              <span>{c.name}</span>
              <small>{c.photoIds.length} photos</small>
            </button>
          ))}
        </div>
      )}
    </div>
  </Modal>;
}
