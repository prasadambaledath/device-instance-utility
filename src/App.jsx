import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Header from './Header.jsx'

const INITIAL_ROWS = [
  { id: 'r1', name: 'D1', className: 'AudioVisual', subClass: 'SubClass1' },
  { id: 'r2', name: 'D2', className: 'AudioVisual', subClass: 'SubClass1' },
  { id: 'r3', name: 'D3', className: 'AudioVisual', subClass: 'SubClass1' },
  { id: 'r4', name: 'D4', className: 'AudioVisual', subClass: 'SubClass1' },
]

function App() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkOpen, setBulkOpen] = useState(false)

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return rows
    }

    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(query) ||
        row.className.toLowerCase().includes(query) ||
        row.subClass.toLowerCase().includes(query)
      )
    })
  }, [rows, search])

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((row) => selectedIds.includes(row.id))

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((current) => current.filter((id) => !visibleRows.some((row) => row.id === id)))
      return
    }

    setSelectedIds((current) => {
      const merged = new Set(current)
      visibleRows.forEach((row) => merged.add(row.id))
      return Array.from(merged)
    })
  }

  const toggleRow = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const removeRow = (id) => {
    setRows((current) => current.filter((row) => row.id !== id))
    setSelectedIds((current) => current.filter((item) => item !== id))
  }

  return (
    <div className="diu-app">
      <Header />

      <main className="sample-main">
        <section className="sample-card">
          <div className="sample-card-head">
            <h1>Audit (Doors & Inputs)</h1>
          </div>

          <div className="sample-toolbar">
            <div className="sample-toolbar-left">
              <input
                type="text"
                className="sample-search"
                placeholder="Search by name, class, sub class..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="button" className="sample-filter-btn">
                Choose Columns
              </button>
            </div>

            <div className="sample-toolbar-right">
              <div className="sample-bulk">
                <button
                  type="button"
                  className="sample-bulk-btn"
                  onClick={() => setBulkOpen((current) => !current)}
                >
                  Bulk Action <span className="sample-caret">▼</span>
                </button>
                {bulkOpen && (
                  <div className="sample-bulk-menu">
                    <button
                      type="button"
                      onClick={() => {
                        setBulkOpen(false)
                        navigate('/utility')
                      }}
                    >
                      Add (Oracle PPM)
                    </button>
                    <button type="button" onClick={() => setBulkOpen(false)}>
                      Add
                    </button>
                    <button type="button" onClick={() => setBulkOpen(false)}>
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <button type="button" className="sample-add-btn">
                + Add Device
              </button>
            </div>
          </div>

          <div className="sample-table-wrap">
            <table className="sample-table">
              <thead>
                <tr>
                  <th className="col-check">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all visible rows"
                    />
                  </th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Sub Class</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id}>
                    <td className="col-check">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        aria-label={`Select ${row.name}`}
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.className}</td>
                    <td>{row.subClass}</td>
                    <td className="sample-actions">
                      <button type="button" title="Edit row">
                        ✎
                      </button>
                      <button type="button" title="Delete row" onClick={() => removeRow(row.id)}>
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {visibleRows.length === 0 && (
              <div className="sample-empty">No rows found for the current search.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
