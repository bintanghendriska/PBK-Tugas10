import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useNoteStore } from "../../stores/noteStore";

// Mock fetch
global.fetch = vi.fn();

describe("Note Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should fetch notes successfully", async () => {
    const mockNotes = [
      { id: 1, title: "Test Note 1", content: "Content 1" },
      { id: 2, title: "Test Note 2", content: "Content 2" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    });

    const store = useNoteStore();
    await store.fetchNotes();

    expect(store.notes).toEqual(mockNotes);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const store = useNoteStore();
    await store.fetchNotes();

    expect(store.error).toBe("Network error");
    expect(store.loading).toBe(false);
  });

  it("should add note successfully", async () => {
    const newNote = { title: "New Note", content: "New Content" };
    const createdNote = { id: 3, ...newNote };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdNote,
    });

    const store = useNoteStore();
    store.notes = [{ id: 1, title: "Existing Note", content: "Content" }];

    await store.addNote(newNote);
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async

    expect(store.notes).toContain(createdNote);
    expect(store.error).toBe(null);
  });

  it("should handle add note error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const store = useNoteStore();
    await store.addNote({ title: "Test", content: "Test" });

    expect(store.error).toBe("Gagal menambah catatan");
  });

  it("should delete note successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    const store = useNoteStore();
    store.notes = [
      { id: 1, title: "Note 1", content: "Content 1" },
      { id: 2, title: "Note 2", content: "Content 2" },
    ];

    await store.deleteNote(1);

    expect(store.notes).toHaveLength(1);
    expect(store.notes[0].id).toBe(2);
    expect(store.error).toBe(null);
  });

  it("should edit note successfully", async () => {
    const updatedNote = { id: 1, title: "Updated Note", content: "Updated Content" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedNote,
    });

    const store = useNoteStore();
    store.notes = [{ id: 1, title: "Original Note", content: "Original Content" }];

    await store.editNote(1, { title: "Updated Note", content: "Updated Content" });

    expect(store.notes[0]).toEqual(updatedNote);
    expect(store.error).toBe(null);
  });

  it("should handle edit note error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const store = useNoteStore();
    await store.editNote(1, { title: "Test", content: "Test" });

    expect(store.error).toBe("Gagal mengedit catatan");
  });
});
