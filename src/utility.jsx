import { Fragment, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './utility.css'
import Header from './Header.jsx'

const SUBCLASS_OPTIONS = [
  'Reader',
  'Electric Lock',
  'Door Contact',
  'Motion Sensor',
  'IP Camera',
  'Access Panel',
  'Glass Break Sensor',
  'Emergency Button',
]

const PARENT_SUBCLASS_OPTIONS = ['Door Assembly', 'Access Point', 'Security Zone']

const PPM_SEED = [
  {
    id: 'd1',
    description: 'Proximity Card Reader',
    manufacturer: 'HID Global',
    model: 'ProxPro-125',
    qty: 40,
  },
  {
    id: 'd2',
    description: 'Electric Strike Lock',
    manufacturer: 'Von Duprin',
    model: '6112-EL',
    qty: 20,
  },
  {
    id: 'd3',
    description: 'Door Position Contact',
    manufacturer: 'GE Security',
    model: 'DPS-200',
    qty: 20,
  },
  {
    id: 'd4',
    description: 'Request-to-Exit PIR',
    manufacturer: 'Bosch',
    model: 'RTE-450',
    qty: 20,
  },
  {
    id: 'd5',
    description: 'IP Dome Camera',
    manufacturer: 'Axis',
    model: 'P3268-LV',
    qty: 15,
  },
  {
    id: 'd6',
    description: 'Access Control Panel',
    manufacturer: 'Mercury Security',
    model: 'MR52',
    qty: 8,
  },
  {
    id: 'd7',
    description: 'Glass Break Sensor',
    manufacturer: 'Honeywell',
    model: 'FG-1625',
    qty: 10,
  },
  {
    id: 'd8',
    description: 'Duress / Panic Button',
    manufacturer: 'STI',
    model: 'SS2005',
    qty: 12,
  },
]

function Icon({ name, size = 14 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    case 'download':
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="5" y1="21" x2="19" y2="21" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case 'alert':
      return (
        <svg {...common}>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'chevronRight':
      return (
        <svg {...common}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )
    case 'chevronDown':
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )
    case 'arrowUp':
      return (
        <svg {...common}>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      )
    case 'arrowDown':
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    case 'hash':
      return (
        <svg {...common}>
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common} width={30} height={30}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    case 'box':
      return (
        <svg {...common} width={30} height={30}>
          <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
          <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
          <line x1="12" y1="22" x2="12" y2="13" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common} width={30} height={30}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'arrowRight':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  const navigate = useNavigate()
  const seqRef = useRef(1)
  const toastRef = useRef(1)

  const [imported, setImported] = useState(false)
  const [importedAt, setImportedAt] = useState(null)
  const [ppm, setPpm] = useState([])
  const [templates, setTemplates] = useState([])
  const [instances, setInstances] = useState([])

  const [libSearch, setLibSearch] = useState('')
  const [addSearch, setAddSearch] = useState('')
  const [openAddPanelTid, setOpenAddPanelTid] = useState(null)

  const [ntRef, setNtRef] = useState('')
  const [ntDesc, setNtDesc] = useState('')
  const [ntSubclass, setNtSubclass] = useState('')
  const [ntError, setNtError] = useState('')

  const [genCounts, setGenCounts] = useState({})
  const [genOverrides, setGenOverrides] = useState({})
  const [genErrors, setGenErrors] = useState({})

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [numberingModal, setNumberingModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const [isSaveExiting, setIsSaveExiting] = useState(false)

  const nextId = (prefix) => `${prefix}${seqRef.current++}`

  const addToast = (message, type = 'default') => {
    const id = toastRef.current++
    setToasts((current) => [...current, { id, message, type }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }

  const handleSaveExit = () => {
    if (isSaveExiting) {
      return
    }
    setIsSaveExiting(true)
    addToast('Progress saved. Redirecting to list view...', 'success')
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const usedQtyForDevice = (deviceId, excludeTemplateId = null) => {
    let used = 0
    templates.forEach((template) => {
      if (template.id === excludeTemplateId) {
        return
      }
      const entry = template.devices.find((device) => device.deviceId === deviceId)
      if (!entry) {
        return
      }
      const count = instances.filter((instance) => instance.templateId === template.id).length
      used += entry.qtyPerInstance * count
    })
    return used
  }

  const maxCreatableFor = (template) => {
    if (!template || template.devices.length === 0) {
      return 0
    }
    let max = Number.POSITIVE_INFINITY
    template.devices.forEach((entry) => {
      const src = ppm.find((item) => item.id === entry.deviceId)
      if (!src) {
        max = 0
        return
      }
      const available = src.qty - usedQtyForDevice(entry.deviceId, template.id)
      max = Math.min(max, Math.floor(available / entry.qtyPerInstance))
    })
    return Number.isFinite(max) ? max : 0
  }

  const duplicateIds = useMemo(() => {
    const counts = {}
    instances.forEach((instance) => {
      counts[instance.groupId] = (counts[instance.groupId] || 0) + 1
    })
    return new Set(Object.keys(counts).filter((id) => counts[id] > 1))
  }, [instances])

  const buildPreviewRows = () => {
    const rows = []
    instances.forEach((instance) => {
      const template = templates.find((item) => item.id === instance.templateId)
      if (!template) {
        return
      }
      rows.push({
        group: instance.groupId,
        name: instance.groupName,
        subclass: template.parentSubclass,
        type: 'Parent',
        status: instance.status,
      })
      template.devices.forEach((entry) => {
        rows.push({
          group: instance.groupId,
          name: `${instance.groupName} — ${entry.friendlyName}`,
          subclass: ppm.find((item) => item.id === entry.deviceId)?.subclass || '—',
          type: 'Child',
          status: instance.status,
        })
      })
    })
    return rows
  }

  const rows = buildPreviewRows()
  const pendingCount = rows.filter((row) => row.status === 'new').length
  const existingCount = rows.filter((row) => row.status === 'existing').length
  const unresolved = duplicateIds.size > 0

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const availClass = (available, total) => {
    if (available < 0) {
      return 'negative'
    }
    if (total > 0 && available / total < 0.2) {
      return 'low'
    }
    return ''
  }

  const importDevices = () => {
    setPpm(PPM_SEED.map((item) => ({ ...item, subclass: '', hidden: false })))
    setImported(true)
    setImportedAt(new Date())
    addToast(`Imported ${PPM_SEED.length} device records from Oracle PPM.`, 'success')
  }

  const setSubclass = (id, value) => {
    const source = ppm.find((item) => item.id === id)
    setPpm((current) =>
      current.map((item) => (item.id === id ? { ...item, subclass: value } : item)),
    )
    addToast(value ? `Subclass "${value}" assigned to ${source?.description}.` : 'Subclass cleared.')
  }

  const toggleHide = (id, value) => {
    setPpm((current) =>
      current.map((item) => (item.id === id ? { ...item, hidden: value } : item)),
    )
  }

  const createTemplate = () => {
    const ref = ntRef.trim()
    const description = ntDesc.trim()
    setNtError('')
    if (!ref || !description || !ntSubclass) {
      setNtError('Reference, description and parent subclass are all required.')
      return
    }
    if (templates.some((item) => item.ref.toLowerCase() === ref.toLowerCase())) {
      setNtError('Reference must be unique within the project.')
      return
    }
    if (
      templates.some((item) => item.description.toLowerCase() === description.toLowerCase())
    ) {
      setNtError('Description must be unique within the project.')
      return
    }
    setTemplates((current) => [
      ...current,
      {
        id: nextId('t'),
        ref,
        description,
        parentSubclass: ntSubclass,
        locked: false,
        devices: [],
      },
    ])
    setNtRef('')
    setNtDesc('')
    setNtSubclass('')
    addToast(`Template "${ref}" created.`, 'success')
  }

  const deleteTemplate = (templateId) => {
    setTemplates((current) => current.filter((template) => template.id !== templateId))
    setInstances((current) => current.filter((instance) => instance.templateId !== templateId))
    setOpenAddPanelTid((current) => (current === templateId ? null : current))
  }

  const unlockTemplate = (templateId) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId ? { ...template, locked: false } : template,
      ),
    )
    setInstances((current) =>
      current.map((instance) =>
        instance.templateId === templateId ? { ...instance, status: 'new' } : instance,
      ),
    )
    addToast('Template unlocked — instances will be recreated.', 'error')
  }

  const addDeviceToTemplate = (templateId, deviceId) => {
    const source = ppm.find((item) => item.id === deviceId)
    if (!source || !source.subclass) {
      addToast('Assign a subclass before adding this device.', 'error')
      return
    }
    setTemplates((current) =>
      current.map((template) => {
        if (template.id !== templateId || template.locked) {
          return template
        }
        return {
          ...template,
          devices: [
            ...template.devices,
            {
              uid: nextId('u'),
              deviceId,
              friendlyName: source.description,
              qtyPerInstance: 1,
            },
          ],
        }
      }),
    )
    addToast(`${source.description} added to template.`, 'success')
  }

  const removeDeviceFromTemplate = (templateId, uid) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId
          ? { ...template, devices: template.devices.filter((device) => device.uid !== uid) }
          : template,
      ),
    )
  }

  const moveDevice = (templateId, uid, direction) => {
    setTemplates((current) =>
      current.map((template) => {
        if (template.id !== templateId) {
          return template
        }
        const idx = template.devices.findIndex((device) => device.uid === uid)
        const newIndex = idx + direction
        if (idx < 0 || newIndex < 0 || newIndex >= template.devices.length) {
          return template
        }
        const devices = [...template.devices]
        ;[devices[idx], devices[newIndex]] = [devices[newIndex], devices[idx]]
        return { ...template, devices }
      }),
    )
  }

  const updateFriendlyName = (templateId, uid, value) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId
          ? {
              ...template,
              devices: template.devices.map((device) =>
                device.uid === uid ? { ...device, friendlyName: value } : device,
              ),
            }
          : template,
      ),
    )
  }

  const updateQty = (templateId, uid, value) => {
    const parsed = Math.max(1, Number.parseInt(value, 10) || 1)
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId
          ? {
              ...template,
              devices: template.devices.map((device) =>
                device.uid === uid ? { ...device, qtyPerInstance: parsed } : device,
              ),
            }
          : template,
      ),
    )
  }

  const generateInstances = (templateId) => {
    const template = templates.find((item) => item.id === templateId)
    if (!template) {
      return
    }
    const count = Math.max(0, Number.parseInt(genCounts[templateId] ?? 1, 10) || 0)
    const override = Boolean(genOverrides[templateId])
    const max = maxCreatableFor(template)
    if (count < 1) {
      setGenErrors((current) => ({
        ...current,
        [templateId]: 'Enter a number of instances to add.',
      }))
      return
    }
    if (!override && count > max) {
      setGenErrors((current) => ({
        ...current,
        [templateId]: `Requesting ${count} exceeds available quantity (max ${max}).`,
      }))
      return
    }
    setGenErrors((current) => ({ ...current, [templateId]: '' }))
    const existing = instances.filter((item) => item.templateId === templateId).length
    const created = Array.from({ length: count }).map((_, index) => {
      const suffix = String(existing + index + 1).padStart(2, '0')
      return {
        id: nextId('i'),
        templateId,
        groupId: `${template.ref}-${suffix}`,
        groupName: `${template.description} ${suffix}`,
        status: 'new',
        expanded: false,
      }
    })
    setInstances((current) => [...current, ...created])
    addToast(`Generated ${count} instance(s).`, count > max ? 'error' : 'success')
  }

  const removeInstance = (id) => {
    setInstances((current) => current.filter((instance) => instance.id !== id))
  }

  const toggleInstanceExpand = (id) => {
    setInstances((current) =>
      current.map((instance) =>
        instance.id === id ? { ...instance, expanded: !instance.expanded } : instance,
      ),
    )
  }

  const updateInstanceField = (id, field, value) => {
    setInstances((current) =>
      current.map((instance) => (instance.id === id ? { ...instance, [field]: value } : instance)),
    )
  }

  const openNumbering = (templateId) => {
    const template = templates.find((item) => item.id === templateId)
    const templateInstances = instances.filter((item) => item.templateId === templateId)
    if (!template || templateInstances.length === 0) {
      return
    }
    setNumberingModal({
      tid: templateId,
      prefix: `${template.ref}-`,
      start: 1,
      increment: 1,
      digits: 2,
      suffix: '',
      advancedOpen: false,
    })
  }

  const applyNumbering = () => {
    if (!numberingModal) {
      return
    }
    let current = Math.max(0, Number.parseInt(numberingModal.start, 10) || 0)
    const increment = Math.max(1, Number.parseInt(numberingModal.increment, 10) || 1)
    const digits = Math.max(0, Number.parseInt(numberingModal.digits, 10) || 0)
    const pad = (value) => (digits > 0 ? String(value).padStart(digits, '0') : String(value))

    setInstances((all) =>
      all.map((instance) => {
        if (instance.templateId !== numberingModal.tid) {
          return instance
        }
        const next = {
          ...instance,
          groupId: `${numberingModal.prefix || ''}${pad(current)}${numberingModal.suffix || ''}`,
        }
        current += increment
        return next
      }),
    )
    setNumberingModal(null)
    addToast('Group IDs renumbered.', 'success')
  }

  const createAll = () => {
    if (duplicateIds.size > 0) {
      addToast('Resolve duplicate Group IDs before creating.', 'error')
      return
    }
    const newInstances = instances.filter((instance) => instance.status === 'new')
    if (newInstances.length === 0) {
      addToast('Nothing new to create.', 'error')
      return
    }
    setInstances((current) =>
      current.map((instance) =>
        instance.status === 'new' ? { ...instance, status: 'existing' } : instance,
      ),
    )
    const touched = new Set(newInstances.map((instance) => instance.templateId))
    setTemplates((current) =>
      current.map((template) =>
        touched.has(template.id) ? { ...template, locked: true } : template,
      ),
    )
    addToast(`Created ${newInstances.length} assembly instance(s).`, 'success')
  }

  const filteredLibrary = ppm.filter((item) => {
    const q = libSearch.toLowerCase()
    return (
      !q ||
      item.description.toLowerCase().includes(q) ||
      item.manufacturer.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q)
    )
  })

  return (
    <div className="diu-app">
      <Header />

      <div className="subheader">
        <div>
          <h1>Assembly Builder</h1>
        </div>
        <div className="actions">
          <div className="subheader-import">
            <div className="stamp">
              {imported && importedAt
                ? `Last imported ${importedAt.toLocaleTimeString()}`
                : 'Not yet imported'}
            </div>
            <button className="btn subheader-import-btn" onClick={importDevices} type="button">
              <Icon name="download" /> Import Devices
            </button>
          </div>
          <button
            className="btn secondary"
            type="button"
            onClick={handleSaveExit}
            disabled={isSaveExiting}
          >
            {isSaveExiting ? 'Saving...' : 'Save & Exit'}
          </button>
        </div>
      </div>

      <div className="workspace">
        <aside className="col col-library">
          <div className="col-head">
            <h2>Device Library</h2>
            <p>Imported from Oracle PPM</p>
          </div>
          <div className="col-body">
            {!imported ? (
              <div className="empty">
                <div className="glyph">
                  <Icon name="box" />
                </div>
                <p>
                  <b>Nothing imported yet.</b>
                </p>
                <p>Use Import Devices beside Save &amp; Exit to pull PRJ-48213 records.</p>
              </div>
            ) : (
              <>
                <div className="search-bar">
                  <Icon name="search" />
                  <input
                    type="text"
                    placeholder="Search description, make, model..."
                    value={libSearch}
                    onChange={(event) => setLibSearch(event.target.value)}
                  />
                </div>
                {filteredLibrary.map((device) => {
                  const used = usedQtyForDevice(device.id)
                  const available = device.qty - used
                  const cls = availClass(available, device.qty)
                  const percent = Math.max(0, Math.min(100, (available / device.qty) * 100))
                  return (
                    <div
                      key={device.id}
                      className={`lib-row ${device.hidden ? 'hidden-row' : ''}`}
                    >
                      <div className="r1">
                        <div>
                          <div className="desc">{device.description}</div>
                          <div className="mm">
                            {device.manufacturer} · {device.model}
                          </div>
                        </div>
                        <div className={`avail ${cls}`}>
                          {available} / {device.qty}
                        </div>
                      </div>
                      <div className="qtybar">
                        <div className={`fill ${cls}`} style={{ width: `${percent}%` }} />
                      </div>
                      <div className="r2">
                        <select
                          value={device.subclass}
                          onChange={(event) => setSubclass(device.id, event.target.value)}
                        >
                          <option value="">- assign subclass -</option>
                          {SUBCLASS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      {!device.subclass && (
                        <div className="no-subclass-note">
                          <Icon name="alert" /> Assign a subclass before this can be added.
                        </div>
                      )}
                      <div className="r3">
                        <label className="hide-line">
                          <input
                            type="checkbox"
                            checked={device.hidden}
                            onChange={(event) => toggleHide(device.id, event.target.checked)}
                          />
                          Hide from this project
                        </label>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </aside>

        <section className="col col-build">
          <div className="col-head build-head">
            <div className="build-head-text">
              <h2>Create Templates &amp; Instances</h2>
              <p>Each card is one group recipe — add devices, then generate instances.</p>
            </div>
            <div className="stat-chips build-stats">
              <div className="stat-chip">
                <b>{ppm.length}</b>
                <span>PPM devices</span>
              </div>
              <div className="stat-chip">
                <b>{templates.length}</b>
                <span>Templates</span>
              </div>
              <div className="stat-chip">
                <b>{instances.length}</b>
                <span>Instances</span>
              </div>
              <div className={`stat-chip ${pendingCount > 0 ? 'warn' : ''}`}>
                <b>{pendingCount}</b>
                <span>Pending create</span>
              </div>
              {duplicateIds.size > 0 && (
                <div className="stat-chip bad">
                  <b>{duplicateIds.size}</b>
                  <span>Duplicate IDs</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-body">
            {!imported ? (
              <div className="empty">
                <div className="glyph">
                  <Icon name="grid" />
                </div>
                <p className="steps-to-create">
                  <span>Import Devices</span> <Icon name="arrowRight" /> 
                  <span>Create Templates</span> <Icon name="arrowRight" /> 
                  <span>Generate Instances</span>
                </p>
              </div>
            ) : (
              <>
                <div className="new-template-bar">
                  <div className="field">
                    <label>Reference</label>
                    <input
                      type="text"
                      placeholder="DOOR-T1"
                      value={ntRef}
                      onChange={(event) => setNtRef(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="Standard Single Door"
                      value={ntDesc}
                      onChange={(event) => setNtDesc(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Parent subclass</label>
                    <select
                      value={ntSubclass}
                      onChange={(event) => setNtSubclass(event.target.value)}
                    >
                      <option value="">Select...</option>
                      {PARENT_SUBCLASS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn" type="button" onClick={createTemplate}>
                    <Icon name="plus" /> New Template
                  </button>
                  {!!ntError && (
                    <div className="inline-err">
                      <Icon name="alert" /> {ntError}
                    </div>
                  )}
                </div>

                {templates.length === 0 ? (
                  <div className="empty">
                    <div className="glyph">
                      <Icon name="grid" />
                    </div>
                    <p>
                      <b>No templates yet.</b>
                    </p>
                    <p>Create one above, then add devices.</p>
                  </div>
                ) : (
                  templates.map((template) => {
                    const templateInstances = instances.filter(
                      (instance) => instance.templateId === template.id,
                    )
                    const max = maxCreatableFor(template)
                    const eligible = ppm.filter((device) => {
                      const q = addSearch.toLowerCase()
                      return (
                        device.subclass &&
                        !device.hidden &&
                        (!q ||
                          device.description.toLowerCase().includes(q) ||
                          device.manufacturer.toLowerCase().includes(q) ||
                          device.model.toLowerCase().includes(q))
                      )
                    })

                    return (
                      <div className="tpl-card" key={template.id}>
                        <div className="tpl-head">
                          <div className="left">
                            <span className="ref">{template.ref}</span>
                            <span className="desc">{template.description}</span>
                            <span className="badge gray">{template.parentSubclass}</span>
                            {template.locked && (
                              <span className="badge warning">
                                <Icon name="lock" size={11} /> Locked
                              </span>
                            )}
                            <span className="badge info">{templateInstances.length} instance(s)</span>
                          </div>
                          <button
                            className="btn icon small danger"
                            type="button"
                            onClick={() => deleteTemplate(template.id)}
                            title="Delete template"
                          >
                            <Icon name="x" size={12} />
                          </button>
                        </div>
                        <div className="tpl-body">
                          {template.locked && (
                            <div className="override-note">
                              <Icon name="alert" />
                              Locked — editing recreates existing instances and loses captured data.
                              <button
                                className="btn small secondary"
                                type="button"
                                onClick={() => unlockTemplate(template.id)}
                              >
                                Unlock anyway
                              </button>
                            </div>
                          )}

                          {template.devices.length === 0 ? (
                            <div className="devlist-empty">No devices added yet.</div>
                          ) : (
                            <table>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Source Device</th>
                                  <th>Friendly Name</th>
                                  <th>Qty/Inst</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                {template.devices.map((entry, index) => {
                                  const src = ppm.find((device) => device.id === entry.deviceId)
                                  return (
                                    <tr key={entry.uid}>
                                      <td>{index + 1}</td>
                                      <td>{src ? src.description : 'Removed from PPM'}</td>
                                      <td>
                                        <input
                                          className="name-input"
                                          type="text"
                                          value={entry.friendlyName}
                                          disabled={template.locked}
                                          onChange={(event) =>
                                            updateFriendlyName(
                                              template.id,
                                              entry.uid,
                                              event.target.value,
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="small-input"
                                          type="number"
                                          min="1"
                                          value={entry.qtyPerInstance}
                                          disabled={template.locked}
                                          onChange={(event) =>
                                            updateQty(template.id, entry.uid, event.target.value)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <button
                                          className="btn icon small secondary"
                                          type="button"
                                          disabled={index === 0 || template.locked}
                                          onClick={() => moveDevice(template.id, entry.uid, -1)}
                                          title="Move up"
                                        >
                                          <Icon name="arrowUp" size={12} />
                                        </button>
                                        <button
                                          className="btn icon small secondary"
                                          type="button"
                                          disabled={
                                            index === template.devices.length - 1 || template.locked
                                          }
                                          onClick={() => moveDevice(template.id, entry.uid, 1)}
                                          title="Move down"
                                        >
                                          <Icon name="arrowDown" size={12} />
                                        </button>
                                        <button
                                          className="btn icon small danger"
                                          type="button"
                                          disabled={template.locked}
                                          onClick={() => removeDeviceFromTemplate(template.id, entry.uid)}
                                          title="Remove"
                                        >
                                          <Icon name="x" size={12} />
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          )}

                          <div className="add-device-row">
                            <button
                              className="btn small secondary"
                              type="button"
                              disabled={template.locked}
                              onClick={() => {
                                setOpenAddPanelTid((current) =>
                                  current === template.id ? null : template.id,
                                )
                                setAddSearch('')
                              }}
                            >
                              <Icon name="plus" />{' '}
                              {openAddPanelTid === template.id ? 'Close' : 'Add Device'}
                            </button>
                          </div>

                          {openAddPanelTid === template.id && (
                            <div className="add-panel">
                              <div className="add-panel-search">
                                <Icon name="search" />
                                <input
                                  type="text"
                                  placeholder="Search description, make or model..."
                                  value={addSearch}
                                  onChange={(event) => setAddSearch(event.target.value)}
                                />
                              </div>
                              <div className="add-panel-list">
                                {eligible.length === 0 ? (
                                  <div className="add-panel-empty">
                                    No matching devices with assigned subclass.
                                  </div>
                                ) : (
                                  eligible.map((device) => {
                                    const available = device.qty - usedQtyForDevice(device.id)
                                    const cls = availClass(available, device.qty)
                                    return (
                                      <div className="add-panel-row" key={device.id}>
                                        <div className="apr-info">
                                          <div className="apr-desc">{device.description}</div>
                                          <div className="apr-mm">
                                            {device.manufacturer} · {device.model}
                                          </div>
                                        </div>
                                        <div className={`apr-avail ${cls}`}>
                                          {available} / {device.qty}
                                        </div>
                                        <button
                                          className="btn small"
                                          type="button"
                                          onClick={() => addDeviceToTemplate(template.id, device.id)}
                                        >
                                          <Icon name="plus" /> Add
                                        </button>
                                      </div>
                                    )
                                  })
                                )}
                              </div>
                            </div>
                          )}

                          <div className="section-divider">Generate Instances</div>
                          <div className="gen-bar">
                            <span>Add</span>
                            <input
                              type="number"
                              min="1"
                              value={genCounts[template.id] ?? 1}
                              disabled={template.locked}
                              onChange={(event) =>
                                setGenCounts((current) => ({
                                  ...current,
                                  [template.id]: event.target.value,
                                }))
                              }
                            />
                            <span>instance(s)</span>
                            <button
                              className="btn small"
                              type="button"
                              disabled={template.locked || template.devices.length === 0}
                              onClick={() => generateInstances(template.id)}
                            >
                              Generate
                            </button>
                            <label className="checkbox-line">
                              <input
                                type="checkbox"
                                checked={genOverrides[template.id] || false}
                                disabled={template.locked}
                                onChange={(event) =>
                                  setGenOverrides((current) => ({
                                    ...current,
                                    [template.id]: event.target.checked,
                                  }))
                                }
                              />
                              Override PPM limit
                            </label>
                          </div>
                          <div className="max-hint">
                            Up to <b>{max}</b> more instance(s) fit within remaining quantity.
                          </div>
                          {!!genErrors[template.id] && (
                            <div className="inline-err">
                              <Icon name="alert" /> {genErrors[template.id]}
                            </div>
                          )}

                          {templateInstances.length === 0 ? (
                            <div className="empty empty-small">
                              <p>No instances generated for this template yet.</p>
                            </div>
                          ) : (
                            <table>
                              <thead>
                                <tr>
                                  <th style={{ width: '24px' }} />
                                  <th>
                                    Group ID{' '}
                                    <button
                                      className="th-action"
                                      type="button"
                                      title="Auto-number Group IDs"
                                      onClick={() => openNumbering(template.id)}
                                    >
                                      <Icon name="settings" size={13} />
                                    </button>
                                  </th>
                                  <th>Group Name</th>
                                  <th>Status</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                {templateInstances.map((instance) => {
                                  const isDup = duplicateIds.has(instance.groupId)
                                  return (
                                    <Fragment key={instance.id}>
                                      <tr>
                                        <td>
                                          <span
                                            className="expand-toggle"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => toggleInstanceExpand(instance.id)}
                                            onKeyDown={(event) => {
                                              if (event.key === 'Enter' || event.key === ' ') {
                                                toggleInstanceExpand(instance.id)
                                              }
                                            }}
                                          >
                                            <Icon
                                              name={instance.expanded ? 'chevronDown' : 'chevronRight'}
                                              size={13}
                                            />
                                          </span>
                                        </td>
                                        <td>
                                          <input
                                            className={`name-input ${isDup ? 'err' : ''}`}
                                            type="text"
                                            value={instance.groupId}
                                            onChange={(event) =>
                                              updateInstanceField(
                                                instance.id,
                                                'groupId',
                                                event.target.value,
                                              )
                                            }
                                          />
                                          {isDup && (
                                            <div className="dup-note">Duplicate Group ID</div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            className="name-input"
                                            type="text"
                                            value={instance.groupName}
                                            onChange={(event) =>
                                              updateInstanceField(
                                                instance.id,
                                                'groupName',
                                                event.target.value,
                                              )
                                            }
                                          />
                                        </td>
                                        <td>
                                          {instance.status === 'existing' ? (
                                            <span className="badge success">Existing</span>
                                          ) : (
                                            <span className="badge warning">New</span>
                                          )}
                                        </td>
                                        <td>
                                          <button
                                            className="btn icon small danger"
                                            type="button"
                                            onClick={() => removeInstance(instance.id)}
                                            title="Remove"
                                          >
                                            <Icon name="x" size={12} />
                                          </button>
                                        </td>
                                      </tr>
                                      {instance.expanded && (
                                        <tr>
                                          <td colSpan="5" className="child-table">
                                            <table>
                                              <thead>
                                                <tr>
                                                  <th>Group ID</th>
                                                  <th>Child Device Name</th>
                                                  <th>Qty</th>
                                                  <th>Subclass</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {template.devices.map((entry) => (
                                                  <tr key={`${instance.id}-${entry.uid}`}>
                                                    <td>{instance.groupId}</td>
                                                    <td>
                                                      {instance.groupName} — {entry.friendlyName}
                                                    </td>
                                                    <td>{entry.qtyPerInstance}</td>
                                                    <td>
                                                      {ppm.find(
                                                        (device) => device.id === entry.deviceId,
                                                      )?.subclass || '—'}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                            <div className="parent-note">
                                              Parent device: <b>{instance.groupName}</b> (
                                              {template.parentSubclass})
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </Fragment>
                                  )
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </>
            )}
          </div>
        </section>

        <aside className="col col-preview">
          <div className="col-head">
            <h2>Live Preview</h2>
            <p>Every device that will land in iTrac</p>
          </div>
          <div className="col-body">
            <div className="summary-grid">
              <div className="summary-cell">
                <div className="num">{instances.length}</div>
                <div className="lbl">Instances</div>
              </div>
              <div className={`summary-cell ${pendingCount ? 'warn' : ''}`}>
                <div className="num">{pendingCount}</div>
                <div className="lbl">To create</div>
              </div>
              <div className="summary-cell">
                <div className="num">{existingCount}</div>
                <div className="lbl">Already created</div>
              </div>
              <div className={`summary-cell ${unresolved ? 'bad' : ''}`}>
                <div className="num">{duplicateIds.size}</div>
                <div className="lbl">Duplicate IDs</div>
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="empty">
                <div className="glyph">
                  <Icon name="eye" />
                </div>
                <p>
                  <b>Nothing to preview.</b>
                </p>
                <p>Generate instances in the build canvas to see devices here.</p>
              </div>
            ) : (
              <>
                <div>
                  {pageRows.map((row, index) => (
                    <div className="preview-row" key={`${row.group}-${row.name}-${index}`}>
                      <div className="pname">
                        {row.type === 'Parent' ? <b>{row.name}</b> : row.name}
                        <div className="ptag">
                          {row.group} · {row.subclass}
                          {duplicateIds.has(row.group) ? (
                            <span className="dup-inline"> · dup</span>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        {row.status === 'existing' ? (
                          <span className="badge success">Existing</span>
                        ) : (
                          <span className="badge warning">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <span>Rows/page</span>
                  <select
                    value={pageSize}
                    onChange={(event) => {
                      setPageSize(Number(event.target.value))
                      setPage(1)
                    }}
                  >
                    {[8, 20, 50].map((num) => (
                      <option value={num} key={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <span>
                    {currentPage}/{totalPages}
                  </span>
                  <button
                    className="pg-btn"
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  >
                    ‹
                  </button>
                  <button
                    className="pg-btn"
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  >
                    ›
                  </button>
                </div>
              </>
            )}

            <div className="sticky-cta">
              <button
                className="btn block"
                type="button"
                disabled={unresolved || pendingCount === 0}
                onClick={createAll}
              >
                Create All ({pendingCount})
              </button>
              {unresolved && (
                <div className="inline-err center">
                  <Icon name="alert" /> Resolve duplicate Group IDs first.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {numberingModal && (
        <div className="modal-overlay" onClick={() => setNumberingModal(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <h3>Auto-Number Group IDs</h3>
              <button
                className="btn icon small secondary"
                type="button"
                onClick={() => setNumberingModal(null)}
              >
                <Icon name="x" size={12} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-hint">
                Applies to all instances of this template in table order.
              </p>
              <div className="modal-row">
                <div className="modal-field">
                  <label>Prefix</label>
                  <input
                    type="text"
                    value={numberingModal.prefix}
                    onChange={(event) =>
                      setNumberingModal((current) => ({
                        ...current,
                        prefix: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="modal-row">
                <div className="modal-field">
                  <label>Starting Number</label>
                  <input
                    type="number"
                    min="0"
                    value={numberingModal.start}
                    onChange={(event) =>
                      setNumberingModal((current) => ({
                        ...current,
                        start: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div
                className="modal-advanced-toggle"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setNumberingModal((current) => ({
                    ...current,
                    advancedOpen: !current.advancedOpen,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setNumberingModal((current) => ({
                      ...current,
                      advancedOpen: !current.advancedOpen,
                    }))
                  }
                }}
              >
                <Icon name={numberingModal.advancedOpen ? 'chevronDown' : 'chevronRight'} />
                Advanced options
              </div>
              {numberingModal.advancedOpen && (
                <>
                  <div className="modal-row">
                    <div className="modal-field">
                      <label>Increment Amount</label>
                      <input
                        type="number"
                        min="1"
                        value={numberingModal.increment}
                        onChange={(event) =>
                          setNumberingModal((current) => ({
                            ...current,
                            increment: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="modal-field">
                      <label>Number of Digits</label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={numberingModal.digits}
                        onChange={(event) =>
                          setNumberingModal((current) => ({
                            ...current,
                            digits: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-field">
                      <label>Suffix</label>
                      <input
                        type="text"
                        value={numberingModal.suffix}
                        onChange={(event) =>
                          setNumberingModal((current) => ({
                            ...current,
                            suffix: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-foot">
              <button
                className="btn secondary"
                type="button"
                onClick={() => setNumberingModal(null)}
              >
                Cancel
              </button>
              <button className="btn" type="button" onClick={applyNumbering}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="toast-wrap">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${
              toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : ''
            }`}
          >
            {toast.type === 'success' && <Icon name="check" size={13} />}
            {toast.type === 'error' && <Icon name="alert" size={13} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
