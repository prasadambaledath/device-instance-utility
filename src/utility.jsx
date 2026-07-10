import { Fragment, useEffect, useState } from 'react'
import Header from './Header.jsx'
import './utility.css'

const SUBCLASSES = [
  'Card Reader',
  'Door Lock',
  'Door Contact',
  'REX Device',
  'Door Hardware',
  'Panel',
  'Power',
  'Camera',
  'Intercom',
  'Intrusion Sensor',
  'Network',
  'Software License',
  'Enclosure',
  'Turnstile',
  'Peripheral',
  'Notification Device',
]

const CATALOG = [
  ['d01', 'Multi-tech card reader', 'HID', 'Signo 20', 24, 'Card Reader'],
  ['d02', 'Multi-tech card reader, keypad', 'HID', 'Signo 20K', 8, 'Card Reader'],
  ['d03', 'Mullion card reader', 'HID', 'iCLASS SE R10', 30, 'Card Reader'],
  ['d04', 'Mid-range card reader', 'HID', 'iCLASS SE R15', 12, 'Card Reader'],
  ['d05', 'Wall switch card reader', 'HID', 'iCLASS SE R40', 16, 'Card Reader'],
  ['d06', 'Electric strike, fail-secure', 'HES', '1600-630', 22, 'Door Lock'],
  ['d07', 'Electric strike, fail-safe', 'HES', '9600-630', 10, 'Door Lock'],
  ['d08', 'Magnetic lock, 1200 lb', 'Securitron', 'M62', 6, 'Door Lock'],
  ['d09', 'Electrified mortise lock', 'Sargent', '8271', 14, 'Door Lock'],
  ['d10', 'Electrified panic hardware', 'Von Duprin', '99EL', 8, 'Door Lock'],
  ['d11', 'Door contact, recessed', 'GRI', '180-12', 40, 'Door Contact'],
  ['d12', 'Door contact, surface mount', 'GRI', '4400A', 18, 'Door Contact'],
  ['d13', 'Overhead door contact', 'GRI', '4532', 4, 'Door Contact'],
  ['d14', 'Request-to-exit PIR', 'Bosch', 'DS150i', 26, 'REX Device'],
  ['d15', 'Request-to-exit PIR', 'Kantech', 'T.REX-XL', 12, 'REX Device'],
  ['d16', 'Push-to-exit button', 'Camden', 'CM-30U', 10, 'REX Device'],
  ['d17', 'Intelligent controller', 'Mercury', 'LP1502', 4, 'Panel'],
  ['d18', 'Door controller, 2-reader', 'Mercury', 'MR52', 12, 'Panel'],
  ['d19', 'Input module, 16-zone', 'Mercury', 'MR16IN', 3, 'Panel'],
  ['d20', 'Output module, 16-relay', 'Mercury', 'MR16OUT', 2, 'Panel'],
  ['d21', 'Power supply, 12/24 VDC', 'LifeSafety Power', 'FPO150', 6, 'Power'],
  ['d22', 'Battery, 12V 7Ah', 'Power-Sonic', 'PS-1270', 12, 'Power'],
  ['d23', 'Dome camera, 5MP', 'Axis', 'P3265-LVE', 28, 'Camera'],
  ['d24', 'Bullet camera, 4K', 'Axis', 'P1468-LE', 10, 'Camera'],
  ['d25', 'PTZ camera', 'Axis', 'Q6135-LE', 4, 'Camera'],
  ['d26', 'Multisensor camera', 'Axis', 'P3735-PLE', 6, 'Camera'],
  ['d27', 'Fisheye camera', 'Axis', 'M4308-PLE', 8, 'Camera'],
  ['d28', 'Intercom door station', 'Aiphone', 'IX-DV', 6, 'Intercom'],
  ['d29', 'Intercom master station', 'Aiphone', 'IX-MV7-HB', 2, 'Intercom'],
  ['d30', 'Motion detector, dual-tech', 'Bosch', 'ISC-BDL2-WP12G', 20, 'Intrusion Sensor'],
  ['d31', 'Glassbreak detector', 'Honeywell', 'FG1625', 14, 'Intrusion Sensor'],
  ['d32', 'Panic / duress button', 'Honeywell', '269R', 8, 'Intrusion Sensor'],
  ['d33', 'Alarm keypad', 'Bosch', 'B940W', 5, 'Intrusion Sensor'],
  ['d34', 'Intrusion panel', 'Bosch', 'B9512G', 1, 'Panel'],
  ['d35', 'Card printer', 'Fargo', 'DTC4500e', 1, 'Peripheral'],
  ['d36', 'Enrollment reader', 'HID', 'OMNIKEY 5427CK', 2, 'Peripheral'],
  ['d37', 'Wireless lockset', 'Assa Abloy', 'IN120', 16, 'Door Lock'],
  ['d38', 'Power transfer hinge', 'Command Access', 'ETH4W', 24, 'Door Hardware'],
  ['d39', 'Door position switch, high-security', 'Magnasphere', 'HSS-L2D', 6, 'Door Contact'],
  ['d40', 'Local alarm sounder', 'STI', 'SA5000', 8, 'Notification Device'],
  ['d41', 'Network switch, 24-port PoE', 'Cisco', 'CBS350-24P', 4, 'Network'],
  ['d42', 'Media converter', 'ComNet', 'CNFE1002M', 8, 'Network'],
  ['d43', 'UPS, 1500VA', 'APC', 'SMT1500RM2U', 2, 'Power'],
  ['d44', 'VMS server', 'Dell', 'PowerEdge R450', 1, 'Network'],
  ['d45', 'Monitoring workstation', 'Dell', 'OptiPlex 7010', 3, 'Network'],
  ['d46', 'Monitor, 27-inch', 'Dell', 'P2723DE', 6, 'Peripheral'],
  ['d47', 'VMS camera license', 'Milestone', 'XProtect Device', 56, 'Software License'],
  ['d48', 'Access control door license', 'Genetec', 'Synergis-1DR', 46, 'Software License'],
  ['d49', 'Junction box', 'Hoffman', 'A8066CHNF', 20, 'Enclosure'],
  ['d50', 'Reader interface board', 'Mercury', 'MR62e', 10, 'Panel'],
  ['d51', 'Surge protector, reader circuit', 'Ditek', 'DTK-2MHLP24B', 12, 'Power'],
  ['d52', 'Composite access control cable', 'Windy City Wire', '4463270', 18, 'Enclosure'],
  ['d53', 'Cat6A cable, box', 'Belden', '10GXS12', 24, 'Network'],
  ['d54', 'Optical turnstile lane', 'Boon Edam', 'Lifeline Speedlane', 2, 'Turnstile'],
  ['d55', 'Camera pole, parking', 'Pelco', 'PP4348', 4, 'Camera'],
  ['d56', 'Key switch', 'Camden', 'CM-1200', 5, 'Door Hardware'],
  ['d57', 'Delayed egress device', 'Von Duprin', 'Chexit CX99', 3, 'Door Lock'],
  ['d58', 'Elevator reader, flush mount', 'HID', 'iCLASS SE R10 ELV', 8, 'Card Reader'],
  ['d59', 'Mobile credential pack (100)', 'HID', 'MOBILE-ID', 5, 'Card Reader'],
  ['d60', 'Camera mount, pendant', 'Axis', 'T91B50', 12, 'Camera'],
]

const B_ONLY = new Set(['d59', 'd60'])
const B_OMITTED = new Set(['d13', 'd35'])
const B_QTY = { d01: 30, d11: 48, d23: 34 }

const norm = (v) => String(v || '').trim().toLowerCase()
const pad = (n, w) => String(n).padStart(w, '0')
const uid = (prefix) => `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 6)}`
const STORAGE_KEY = 'asset-import-utility-state-v1'

function loadPersistedState() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function getSnapshot(n) {
  const isB = n % 2 === 0
  const out = []
  for (const [key, desc, make, model, qty, suggested] of CATALOG) {
    if (!isB && B_ONLY.has(key)) continue
    if (isB && B_OMITTED.has(key)) continue
    out.push({ key, desc, make, model, qty: isB && B_QTY[key] ? B_QTY[key] : qty, suggested })
  }
  return out
}

function UtilityPage() {
  const [importCount, setImportCount] = useState(
    () => Number(loadPersistedState()?.importCount) || 0,
  )
  const [lastImportAt, setLastImportAt] = useState(
    () => loadPersistedState()?.lastImportAt || null,
  )
  const [devices, setDevices] = useState(() => {
    const saved = loadPersistedState()
    return Array.isArray(saved?.devices) ? saved.devices : []
  })
  const [templates, setTemplates] = useState(() => {
    const saved = loadPersistedState()
    return Array.isArray(saved?.templates) ? saved.templates : []
  })
  const [ovr, setOvr] = useState(() => {
    const saved = loadPersistedState()
    return saved?.ovr && typeof saved.ovr === 'object' ? saved.ovr : {}
  })
  const [selInst, setSelInst] = useState({})

  const [search, setSearch] = useState('')
  const [showHidden, setShowHidden] = useState(false)
  const [tplSearch, setTplSearch] = useState('')
  const [instSearch, setInstSearch] = useState('')
  const [pvSearch, setPvSearch] = useState('')
  const [sort, setSort] = useState({ col: null, dir: 1 })
  const [pvSort, setPvSort] = useState({ col: null, dir: 1 })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(
    () => Number(loadPersistedState()?.pageSize) || 10,
  )

  const [expTpl, setExpTpl] = useState({})
  const [expInst, setExpInst] = useState({})
  const [subDD, setSubDD] = useState('')
  const [subFilter, setSubFilter] = useState('')
  const [dragCtx, setDragCtx] = useState(null)
  const [dragOverItem, setDragOverItem] = useState('')

  const [toast, setToast] = useState(null)
  const [banner, setBanner] = useState('')
  const [modal, setModal] = useState('')
  const [ovrKey, setOvrKey] = useState('')
  const [manual, setManual] = useState({
    desc: '',
    make: '',
    model: '',
    subclass: '',
    qty: 1,
    err: '',
  })
  const [ren, setRen] = useState({ prefix: '', suffix: '', start: 1, inc: 1, pad: 3 })

  const showToast = (msg, kind = 'success') => {
    setToast({ msg, kind })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!subDD) return
      if (e.target.closest('[data-ddbox="1"]')) return
      setSubDD('')
      setSubFilter('')
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [subDD])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          devices,
          templates,
          ovr,
          importCount,
          lastImportAt,
          pageSize,
        }),
      )
    } catch {
      // Ignore localStorage write failures.
      void 0
    }
  }, [devices, templates, ovr, importCount, lastImportAt, pageSize])

  const usedQty = (key) => {
    let used = 0
    templates.forEach((t) => {
      const c = t.items.filter((i) => i.deviceKey === key).length
      used += c * (Number(t.qty) || 0)
    })
    return used
  }

  const totalQty = (d) => (d.omitted ? 0 : Number(d.ppmQty) || 0)
  const findDevice = (key) => devices.find((d) => d.key === key)
  const findTpl = (id) => templates.find((t) => t.id === id)

  const doImport = () => {
    const n = importCount + 1
    const snap = getSnapshot(n)
    const byKey = new Map(snap.map((s) => [s.key, s]))
    const existing = new Set(devices.map((d) => d.key))
    const next = devices.map((d) => {
      if (d.manual) return d
      const s = byKey.get(d.key)
      if (s) {
        return {
          ...d,
          ppmQty: s.qty,
          omitted: false,
          isNew: false,
          qtyChanged: n > 1 && s.qty !== d.ppmQty,
        }
      }
      return { ...d, omitted: true, isNew: false, qtyChanged: false }
    })
    snap.forEach((s) => {
      if (existing.has(s.key)) return
      next.push({
        key: s.key,
        desc: s.desc,
        make: s.make,
        model: s.model,
        ppmQty: s.qty,
        suggested: s.suggested,
        subclass: '',
        hidden: false,
        omitted: false,
        isNew: n > 1,
        qtyChanged: false,
        manual: false,
        ovrOn: false,
      })
    })
    setDevices(next)
    setImportCount(n)
    setLastImportAt(Date.now())
    setBanner('')
    showToast(`Imported ${snap.length} material records from Oracle PPM.`)
  }

  const updDevice = (key, patch) =>
    setDevices((curr) => curr.map((d) => (d.key === key ? { ...d, ...patch } : d)))

  const updTpl = (id, patch) =>
    setTemplates((curr) => curr.map((t) => (t.id === id ? { ...t, ...patch } : t)))

  const tplFlags = (t) => {
    const refDup = templates.some((o) => o.id !== t.id && norm(o.ref) === norm(t.ref) && norm(t.ref))
    const descDup = templates.some(
      (o) => o.id !== t.id && norm(o.desc) === norm(t.desc) && norm(t.desc),
    )
    const refEmpty = !norm(t.ref)
    const descEmpty = !norm(t.desc)
    const friendlies = t.items.map((i) => norm(i.friendly))
    const friendlyEmpty = friendlies.some((f) => !f)
    const friendlyDup = friendlies.some((f, i) => f && friendlies.indexOf(f) !== i)
    const devs = t.items.map((i) => findDevice(i.deviceKey))
    const unavailable = devs.some((d) => !d || d.omitted)
    const missingSub = devs.some((d) => d && !d.subclass)
    const parentSubMissing = t.items.length > 0 && !t.parentSub
    const instanceBlocked = refDup || descDup || refEmpty || descEmpty || friendlyEmpty || friendlyDup
    return { refDup, descDup, refEmpty, descEmpty, friendlyEmpty, friendlyDup, unavailable, missingSub, parentSubMissing, instanceBlocked }
  }

  const instances = (() => {
    const out = []
    templates.forEach((t) => {
      const f = tplFlags(t)
      if (f.instanceBlocked || t.items.length === 0) return
      const q = Number(t.qty) || 0
      for (let i = 0; i < q; i += 1) {
        const key = `${t.id}:${i}`
        const ov = ovr[key] || {}
        out.push({
          key,
          tpl: t,
          idx: i,
          flags: f,
          gid: ov.groupId != null ? ov.groupId : `${t.ref}-${pad(i + 1, 2)}`,
          gname: ov.groupName != null ? ov.groupName : `${t.desc} ${i + 1}`,
        })
      }
    })
    return out
  })()

  const addTemplate = () => {
    const id = uid('t')
    setTemplates((curr) => [...curr, { id, ref: '', desc: '', parentSub: '', qty: 1, items: [], search: '' }])
    setExpTpl((curr) => ({ ...curr, [id]: true }))
  }

  const copyTemplate = (src) => {
    const id = uid('t')
    const tpl = {
      id,
      ref: '',
      desc: '',
      parentSub: src.parentSub,
      qty: 0,
      search: '',
      items: src.items.map((it) => ({ iid: uid('i'), deviceKey: it.deviceKey, friendly: it.friendly })),
    }
    const idx = templates.findIndex((t) => t.id === src.id)
    const next = templates.slice()
    next.splice(idx + 1, 0, tpl)
    setTemplates(next)
    setExpTpl((curr) => ({ ...curr, [id]: true }))
    showToast('Template copied. Enter a new reference and description.')
  }

  const addItem = (tplId, deviceKey) => {
    const d = findDevice(deviceKey)
    const t = findTpl(tplId)
    if (!d || !t || !d.subclass) return
    const sameCount = t.items.filter((i) => i.deviceKey === deviceKey).length
    const friendly = sameCount === 0 ? d.desc : `${d.desc} ${sameCount + 1}`
    updTpl(tplId, { items: [...t.items, { iid: uid('i'), deviceKey, friendly }], search: '' })
  }

  const moveItem = (tplId, fromIid, toIid) => {
    const t = findTpl(tplId)
    if (!t) return
    const items = t.items.slice()
    const from = items.findIndex((i) => i.iid === fromIid)
    const to = items.findIndex((i) => i.iid === toIid)
    if (from < 0 || to < 0 || from === to) return
    const moved = items.splice(from, 1)[0]
    items.splice(to, 0, moved)
    updTpl(tplId, { items })
  }

  const setOvrField = (key, field, value) =>
    setOvr((curr) => ({ ...curr, [key]: { ...(curr[key] || {}), [field]: value } }))

  const flatPreview = (() => {
    const rows = []
    instances.forEach((g) => {
      rows.push({ type: 'Parent', gid: g.gid, name: g.gname, sub: g.tpl.parentSub || '-', src: `Assembly: ${g.tpl.ref}` })
      g.tpl.items.forEach((it) => {
        const d = findDevice(it.deviceKey)
        rows.push({
          type: 'Child',
          gid: g.gid,
          name: `${g.gname} - ${it.friendly}`,
          sub: d ? d.subclass || '-' : '-',
          src: d ? `${d.make} ${d.model}${d.manual ? ' (non-PPM)' : ''}` : '',
        })
      })
    })
    return rows
  })()

  const gidCounts = (() => {
    const c = {}
    instances.forEach((g) => {
      const k = norm(g.gid)
      c[k] = (c[k] || 0) + 1
    })
    return c
  })()

  const filteredDevices = (() => {
    const q = norm(search)
    let arr = devices.filter((d) => (showHidden ? true : !d.hidden))
    if (q) arr = arr.filter((d) => `${d.desc} ${d.make} ${d.model}`.toLowerCase().includes(q))
    if (!sort.col) return arr
    const numCols = ['ppmQty', 'total', 'used', 'remaining']
    return [...arr].sort((a, b) => {
      const value = (d) => {
        if (sort.col === 'total') return totalQty(d)
        if (sort.col === 'used') return usedQty(d.key)
        if (sort.col === 'remaining') return totalQty(d) - usedQty(d.key)
        if (sort.col === 'ppmQty') return d.omitted ? 0 : Number(d.ppmQty) || 0
        return String(d[sort.col] || '').toLowerCase()
      }
      const va = value(a)
      const vb = value(b)
      if (numCols.includes(sort.col)) return (va - vb) * sort.dir
      return va < vb ? -sort.dir : va > vb ? sort.dir : 0
    })
  })()
  const overageDevices = filteredDevices.filter((d) => {
    const rem = totalQty(d) - usedQty(d.key)
    return rem < 0 && !d.hidden && !d.ovrOn
  })

  const visibleTemplates = (() => {
    const q = norm(tplSearch)
    if (!q) return templates
    return templates.filter((t) => `${t.ref || ''} ${t.desc || ''}`.toLowerCase().includes(q))
  })()

  const visibleInstances = (() => {
    const q = norm(instSearch)
    if (!q) return instances
    return instances.filter((g) => `${g.gid} ${g.gname} ${g.tpl.ref}`.toLowerCase().includes(q))
  })()

  const visiblePreview = (() => {
    const q = norm(pvSearch)
    let arr = flatPreview
    if (q) {
      arr = arr.filter((r) => `${r.gid} ${r.name} ${r.sub} ${r.type} ${r.src}`.toLowerCase().includes(q))
    }
    if (!pvSort.col) return arr
    return [...arr].sort((a, b) => {
      const va = String(a[pvSort.col] || '').toLowerCase()
      const vb = String(b[pvSort.col] || '').toLowerCase()
      return va < vb ? -pvSort.dir : va > vb ? pvSort.dir : 0
    })
  })()

  const pageCount = Math.max(1, Math.ceil(visiblePreview.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRows = visiblePreview.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const subMatches = SUBCLASSES.filter((x) => !norm(subFilter) || x.toLowerCase().includes(norm(subFilter)))

  const selectedCount = instances.filter((g) => selInst[g.key]).length
  const dupGids = Object.keys(gidCounts).filter((k) => k && gidCounts[k] > 1)
  const blankGids = instances.filter((g) => !String(g.gid).trim()).length

  const blockers = []
  if (instances.length === 0) blockers.push('No group instances defined')
  templates.forEach((t) => {
    const f = tplFlags(t)
    const msgs = []
    if (f.refEmpty || f.descEmpty) msgs.push('missing reference/description')
    if (f.refDup) msgs.push('duplicate reference')
    if (f.descDup) msgs.push('duplicate description')
    if (f.friendlyEmpty || f.friendlyDup) msgs.push('friendly descriptions incomplete')
    if (f.unavailable) msgs.push('device no longer in PPM')
    if (f.missingSub) msgs.push('device without subclass')
    if (f.parentSubMissing) msgs.push('no parent subclass')
    if (msgs.length) blockers.push(`${t.ref || 'Template'}: ${msgs.join(', ')}`)
  })
  if (dupGids.length) blockers.push(`Duplicate Group IDs: ${dupGids.join(', ').toUpperCase()}`)
  if (blankGids) blockers.push(`${blankGids} instance(s) with a blank Group ID`)

  const addManual = () => {
    if (!norm(manual.desc) || !norm(manual.make) || !norm(manual.model) || !manual.subclass) {
      setManual((m) => ({ ...m, err: 'Description, Make, Model, Sub-class and Quantity are all required.' }))
      return
    }
    const dupe = devices.some(
      (d) =>
        norm(d.desc) === norm(manual.desc) &&
        norm(d.make) === norm(manual.make) &&
        norm(d.model) === norm(manual.model),
    )
    if (dupe) {
      setManual((m) => ({ ...m, err: 'A device with this Description, Make and Model already exists.' }))
      return
    }
    const dev = {
      key: uid('m'),
      desc: manual.desc.trim(),
      make: manual.make.trim(),
      model: manual.model.trim(),
      ppmQty: Number(manual.qty) || 1,
      subclass: manual.subclass,
      suggested: manual.subclass,
      hidden: false,
      omitted: false,
      isNew: false,
      qtyChanged: false,
      manual: true,
      ovrOn: false,
    }
    setDevices((curr) => [...curr, dev])
    setModal('')
    showToast(`Non-PPM device "${dev.desc}" added.`)
  }

  const applyRenumber = () => {
    const startN = Number(ren.start) || 0
    const incN = Math.max(1, Number(ren.inc) || 1)
    const padN = Number(ren.pad) || 3
    const renVal = (n) => `${ren.prefix || ''}${pad(startN + n * incN, padN)}${ren.suffix || ''}`
    let n = 0
    const next = { ...ovr }
    instances.forEach((g) => {
      if (!selInst[g.key]) return
      next[g.key] = { ...(next[g.key] || {}), groupId: renVal(n) }
      n += 1
    })
    setOvr(next)
    setSelInst({})
    setModal('')
    showToast(`${n} Group ID(s) renumbered.`)
  }

  const createAll = () => {
    const children = instances.reduce((a, g) => a + g.tpl.items.length, 0)
    const total = instances.length + children
    setTemplates((curr) => curr.map((t) => ({ ...t, qty: 0 })))
    setOvr({})
    setExpInst({})
    setSelInst({})
    setPage(1)
    setModal('')
    showToast(`${total} devices submitted to the Bulk Add Device workflow. Group instances have been reset.`)
  }

  const fmtImport = (ts) => {
    if (!ts) return 'Not yet imported from Oracle PPM'
    const d = new Date(ts)
    return (
      `Last imported ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ` +
      d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    )
  }

  const overrideDevice = findDevice(ovrKey)
  const renStartN = Number(ren.start) || 0
  const renIncN = Math.max(1, Number(ren.inc) || 1)
  const renPadN = Number(ren.pad) || 3
  const renEx = (n) => `${ren.prefix || ''}${pad(renStartN + n * renIncN, renPadN)}${ren.suffix || ''}`

  return (
    <div className="utility-v2-page">
      <Header />

      <div className="utility-v2-header">
        <div className="utility-v2-title">Device Instance Utility</div>
        <div className="utility-v2-header-right">
          <div className="utility-v2-import-stamp">{fmtImport(lastImportAt)}</div>
          <button className="btn-primary" type="button" onClick={doImport}>
            Import Devices
          </button>
        </div>
      </div>

      {!!banner && (
        <div className="utility-v2-banner">
          <span>{banner}</span>
          <button type="button" onClick={() => setBanner('')}>
            x
          </button>
        </div>
      )}

      <div className="utility-v2-layout">
        <div className="utility-v2-left">
          <section className="panel">
            <div className="panel-head">
              <span className="panel-title">1 · Project Devices</span>
              <span className="count-pill">{devices.length ? `${filteredDevices.filter((d) => !d.hidden).length} of ${devices.length}` : '0'}</span>
              <input className="txt" placeholder="Search description, make or model..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <label className="chk-line">
                <input type="checkbox" checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />
                Show hidden ({devices.filter((d) => d.hidden).length})
              </label>
              <div className="spacer" />
              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  setManual({ desc: '', make: '', model: '', subclass: '', qty: 1, err: '' })
                  setModal('manual')
                }}
              >
                + Add non-PPM device
              </button>
            </div>
            {devices.length > 0 ? (
              <>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {[
                          ['Status', null],
                          ['Description', 'desc'],
                          ['Make', 'make'],
                          ['Model', 'model'],
                          ['iTrac Subclass', 'subclass'],
                          ['PPM Qty', 'ppmQty'],
                          ['Override', null],
                          ['Total', 'total'],
                          ['Used', 'used'],
                          ['Remaining', 'remaining'],
                          ['', null],
                        ].map(([label, col]) => (
                          <th
                            key={label}
                            onClick={() => {
                              if (!col) return
                              setSort((s) => ({ col, dir: s.col === col ? -s.dir : 1 }))
                            }}
                            className={col ? 'sortable' : ''}
                          >
                            {label}
                            {col && sort.col === col ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDevices.map((d) => {
                        const used = usedQty(d.key)
                        const total = totalQty(d)
                        const rem = total - used
                        const chip = d.manual ? 'Non-PPM' : d.omitted ? 'Not in PPM' : d.isNew ? 'New' : d.qtyChanged ? 'Qty updated' : d.hidden ? 'Hidden' : ''
                        return (
                          <tr key={d.key} className={d.omitted || d.hidden ? 'dim' : ''}>
                            <td>{chip ? <span className="chip">{chip}</span> : null}</td>
                            <td>{d.desc}</td>
                            <td>{d.make}</td>
                            <td className="mono">{d.model}</td>
                            <td>
                              <div className="sub-dd-wrap" data-ddbox="1">
                                <button
                                  className={`dd-btn ${!d.subclass ? 'empty' : ''}`}
                                  type="button"
                                  onClick={() => {
                                    setSubDD((curr) => (curr === `dev:${d.key}` ? '' : `dev:${d.key}`))
                                    setSubFilter('')
                                  }}
                                >
                                  <span className="ellip">{d.subclass || '- assign -'}</span>
                                  <span className="dd-caret">▾</span>
                                </button>
                                {subDD === `dev:${d.key}` && (
                                  <div className="dd-box" data-ddbox="1">
                                    <input
                                      className="dd-filter"
                                      placeholder="Search subclasses..."
                                      value={subFilter}
                                      onChange={(e) => setSubFilter(e.target.value)}
                                    />
                                    <div className="dd-list">
                                      <button
                                        className={`dd-opt ${!d.subclass ? 'cur' : ''}`}
                                        type="button"
                                        onClick={() => {
                                          updDevice(d.key, { subclass: '' })
                                          setSubDD('')
                                          setSubFilter('')
                                        }}
                                      >
                                        - none -
                                      </button>
                                      {subMatches.map((x) => (
                                        <button
                                          key={x}
                                          className={`dd-opt ${x === d.subclass ? 'cur' : ''}`}
                                          type="button"
                                          onClick={() => {
                                            updDevice(d.key, { subclass: x })
                                            setSubDD('')
                                            setSubFilter('')
                                          }}
                                        >
                                          {x}
                                        </button>
                                      ))}
                                      {subMatches.length === 0 && <div className="dd-empty">No matches</div>}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="num" width="65">{d.omitted ? 0 : d.ppmQty}</td>
                            <td width="40" align="center">
                              <input
                                type="checkbox"
                                checked={!!d.ovrOn}
                                onChange={() => {
                                  if (d.ovrOn) updDevice(d.key, { ovrOn: false })
                                  else {
                                    setOvrKey(d.key)
                                    setModal('override')
                                  }
                                }}
                              />
                            </td>
                            <td className="num" width="40">{total}</td>
                            <td className="num" width="40">{used}</td>
                            <td className={`num ${rem < 0 ? 'neg' : ''}`} width="40">{rem}</td>
                            <td className="num">
                              <button className="hide-btn" type="button" onClick={() => updDevice(d.key, { hidden: !d.hidden })}>
                                {d.hidden ? 'Unhide' : 'Hide'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {overageDevices.length > 0 && (
                  <div className="overage-warning">
                    ⚠ Used quantity exceeds total available for:{' '}
                    <b>
                      {overageDevices
                        .slice(0, 3)
                        .map((d) => d.desc)
                        .join(', ')}
                      {overageDevices.length > 3 ? ` +${overageDevices.length - 3} more` : ''}
                    </b>
                    . Reduce assembly quantities, or tick Override to acknowledge the overage (Remaining will show a
                    negative value).
                  </div>
                )}
              </>
            ) : (
              <div className="empty-block">
                <div>No devices imported yet</div>
                <div>Import project material records from Oracle PPM to get started.</div>
                <button className="btn-primary" type="button" onClick={doImport}>
                  Import Devices
                </button>
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-head">
              <span className="panel-title">2 · Assembly Templates</span>
              <span className="count-pill">{tplSearch ? `${visibleTemplates.length} of ${templates.length}` : templates.length}</span>
              <input className="txt" placeholder="Search reference or description..." value={tplSearch} onChange={(e) => setTplSearch(e.target.value)} />
              <div className="spacer" />
              <button className="btn-secondary" type="button" onClick={addTemplate}>
                + New template
              </button>
            </div>
            {templates.length === 0 ? (
              <div className="empty-block">No assembly templates yet.</div>
            ) : (
              <div className="templates-wrap">
                <div className="tpl-row tpl-head">
                  <div />
                  <div>Reference</div>
                  <div>Description</div>
                  <div>Parent Subclass</div>
                  <div className="num">Instances</div>
                  <div className="num">Devices</div>
                  <div>Status</div>
                  <div />
                </div>
                {visibleTemplates.map((t) => {
                  const f = tplFlags(t)
                  const expanded = !!expTpl[t.id]
                  const error = f.refEmpty
                    ? 'Reference required'
                    : f.refDup
                      ? 'Duplicate reference'
                      : f.descEmpty
                        ? 'Description required'
                        : f.descDup
                          ? 'Duplicate description'
                          : t.items.length === 0
                            ? 'Add at least one device'
                            : f.friendlyEmpty
                              ? 'Friendly description required'
                              : f.friendlyDup
                                ? 'Duplicate friendly description'
                                : f.unavailable
                                  ? 'Contains device no longer in PPM'
                                  : f.missingSub
                                    ? 'Device missing subclass'
                                    : f.parentSubMissing
                                      ? 'Assign parent subclass'
                                      : ''
                  const query = norm(t.search || '')
                  const candidates = query
                    ? devices
                        .filter((d) => !d.hidden && `${d.desc} ${d.make} ${d.model}`.toLowerCase().includes(query))
                        .slice(0, 8)
                    : []

                  return (
                    <div key={t.id} className="tpl-card">
                      <div className="tpl-row">
                        <button className="icon-btn" type="button" onClick={() => setExpTpl((c) => ({ ...c, [t.id]: !c[t.id] }))}>
                          {expanded ? '▼' : '▶'}
                        </button>
                        <input className={`cell-input mono ${f.refEmpty || f.refDup ? 'err' : ''}`} value={t.ref} onChange={(e) => updTpl(t.id, { ref: e.target.value })} />
                        <input className={`cell-input ${f.descEmpty || f.descDup ? 'err' : ''}`} value={t.desc} onChange={(e) => updTpl(t.id, { desc: e.target.value })} />
                        <div className="sub-dd-wrap" data-ddbox="1">
                          <button
                            className={`dd-btn ${f.parentSubMissing ? 'empty' : ''}`}
                            type="button"
                            onClick={() => {
                              setSubDD((curr) => (curr === `tpl:${t.id}` ? '' : `tpl:${t.id}`))
                              setSubFilter('')
                            }}
                          >
                            <span className="ellip">{t.parentSub || '- assign -'}</span>
                            <span className="dd-caret">▾</span>
                          </button>
                          {subDD === `tpl:${t.id}` && (
                            <div className="dd-box" data-ddbox="1">
                              <input
                                className="dd-filter"
                                placeholder="Search subclasses..."
                                value={subFilter}
                                onChange={(e) => setSubFilter(e.target.value)}
                              />
                              <div className="dd-list">
                                <button
                                  className={`dd-opt ${!t.parentSub ? 'cur' : ''}`}
                                  type="button"
                                  onClick={() => {
                                    updTpl(t.id, { parentSub: '' })
                                    setSubDD('')
                                    setSubFilter('')
                                  }}
                                >
                                  - none -
                                </button>
                                {subMatches.map((x) => (
                                  <button
                                    key={x}
                                    className={`dd-opt ${x === t.parentSub ? 'cur' : ''}`}
                                    type="button"
                                    onClick={() => {
                                      updTpl(t.id, { parentSub: x })
                                      setSubDD('')
                                      setSubFilter('')
                                    }}
                                  >
                                    {x}
                                  </button>
                                ))}
                                {subMatches.length === 0 && <div className="dd-empty">No matches</div>}
                              </div>
                            </div>
                          )}
                        </div>
                        <input className="cell-input num" type="number" min="0" value={t.qty} onChange={(e) => updTpl(t.id, { qty: Math.max(0, Number(e.target.value) || 0) })} />
                        <div className="num" style={{ textAlign: 'center' }}>{t.items.length}</div>
                        <div>{error ? <span className="err-txt">⚠ {error}</span> : <span className="ok-txt">✓ Valid</span>}</div>
                        <div className="tpl-actions">
                          <button className="icon-btn" type="button" onClick={() => copyTemplate(t)}>
                            ⧉
                          </button>
                          <button
                            className="icon-btn del"
                            type="button"
                            onClick={() => {
                              setTemplates((curr) => curr.filter((x) => x.id !== t.id))
                              setOvr((curr) => {
                                const next = {}
                                Object.entries(curr).forEach(([k, v]) => {
                                  if (!k.startsWith(`${t.id}:`)) next[k] = v
                                })
                                return next
                              })
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {expanded && (
                        <div className="tpl-items">
                          <div className="tpl-items-head">
                            <div />
                            <div>
                              Friendly Description <span className="muted">ⓘ</span>
                            </div>
                            <div>Device</div>
                            <div className="num">Remaining</div>
                            <div />
                          </div>
                          {t.items.map((it) => {
                            const d = findDevice(it.deviceKey)
                            const rem = d ? totalQty(d) - usedQty(d.key) : 0
                            const dup = t.items.some((o) => o.iid !== it.iid && norm(o.friendly) === norm(it.friendly) && norm(it.friendly))
                            return (
                              <div
                                key={it.iid}
                                className={`item-row ${dragOverItem === it.iid ? 'drag-over' : ''}`}
                                draggable
                                onDragStart={() => setDragCtx({ tplId: t.id, iid: it.iid })}
                                onDragOver={(e) => {
                                  if (!dragCtx || dragCtx.tplId !== t.id || dragCtx.iid === it.iid) return
                                  e.preventDefault()
                                  if (dragOverItem !== it.iid) setDragOverItem(it.iid)
                                }}
                                onDrop={(e) => {
                                  if (!dragCtx || dragCtx.tplId !== t.id) return
                                  e.preventDefault()
                                  moveItem(t.id, dragCtx.iid, it.iid)
                                  setDragCtx(null)
                                  setDragOverItem('')
                                }}
                                onDragEnd={() => {
                                  setDragCtx(null)
                                  setDragOverItem('')
                                }}
                              >
                                <div className="drag-handle" title="Drag to reorder">
                                  ⋮⋮
                                </div>
                                <input
                                  className={`cell-input ${!norm(it.friendly) || dup ? 'err' : ''}`}
                                  value={it.friendly}
                                  onChange={(e) =>
                                    updTpl(t.id, {
                                      items: t.items.map((x) =>
                                        x.iid === it.iid ? { ...x, friendly: e.target.value } : x,
                                      ),
                                    })
                                  }
                                />
                                <div className="ellip">{d ? `${d.desc} — ${d.make} ${d.model}` : '(removed device)'}</div>
                                <div className={`num ${rem < 0 ? 'neg' : ''}`}>{rem}</div>
                                <button
                                  className="icon-btn del"
                                  type="button"
                                  onClick={() => updTpl(t.id, { items: t.items.filter((x) => x.iid !== it.iid) })}
                                >
                                  ✕
                                </button>
                              </div>
                            )
                          })}
                          <input
                            className="txt add-device-search"
                            placeholder="+ Search devices to add..."
                            value={t.search || ''}
                            onChange={(e) => updTpl(t.id, { search: e.target.value })}
                          />
                          {!!query && (
                            <div className="picker">
                              {candidates.length === 0 && <div className="picker-row">No matching devices</div>}
                              {candidates.map((d) => {
                                const ok = !!d.subclass && !d.omitted
                                const rem = totalQty(d) - usedQty(d.key)
                                const note = !d.subclass ? 'assign subclass first' : d.omitted ? 'not in PPM' : `remaining: ${rem}`
                                return (
                                  <button
                                    key={d.key}
                                    className="picker-row"
                                    type="button"
                                    disabled={!ok}
                                    onClick={() => addItem(t.id, d.key)}
                                  >
                                    <span>{d.desc}</span>
                                    <span className="muted">{`${d.make} ${d.model}`}</span>
                                    <span className={`note ${ok ? '' : 'bad'}`}>{note}</span>
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-head">
              <span className="panel-title">3 · Group Instances</span>
              <span className="count-pill">{instSearch ? `${visibleInstances.length} of ${instances.length}` : instances.length}</span>
              <input className="txt" placeholder="Search Group ID or name..." value={instSearch} onChange={(e) => setInstSearch(e.target.value)} />
              <div className="spacer" />
              <span className="muted">{selectedCount ? `${selectedCount} selected` : ''}</span>
              <button className="btn-secondary" type="button" disabled={!selectedCount} onClick={() => setModal('renumber')}>
                {selectedCount ? `Renumber selected (${selectedCount})` : 'Renumber selected'}
              </button>
              <span className="info-tip" tabIndex={0} role="img" aria-label="Renumber help">
                ⓘ
                <span className="info-tip-text">
                  Select one or more instance rows (checkbox or right-click). Renumber applies only to selected rows,
                  in current list order.
                </span>
              </span>
            </div>
            <div className="table-wrap">
              {instances.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th width="40">
                        <input
                          type="checkbox"
                          checked={instances.length > 0 && selectedCount === instances.length}
                          onChange={() => {
                            if (instances.length > 0 && selectedCount === instances.length) {
                              setSelInst({})
                            } else {
                              const next = {}
                              instances.forEach((g) => {
                                next[g.key] = true
                              })
                              setSelInst(next)
                            }
                          }}
                        />
                      </th>
                      <th width="40" />
                      <th width="200">Group ID</th>
                      <th width="200">Group Name</th>
                      <th width="200">Template</th>
                      <th width="50">Devices</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleInstances.map((g) => {
                      const expanded = !!expInst[g.key]
                      const dup = gidCounts[norm(g.gid)] > 1 && !!String(g.gid).trim()
                      const blank = !String(g.gid).trim()
                      return (
                        <Fragment key={g.key}>
                          <tr
                            className={selInst[g.key] ? 'selected' : ''}
                            onContextMenu={(e) => {
                              e.preventDefault()
                              setSelInst((curr) => ({ ...curr, [g.key]: true }))
                              setModal('renumber')
                            }}
                          >
                            <td width="40">
                              <input
                                type="checkbox"
                                checked={!!selInst[g.key]}
                                onChange={() => setSelInst((curr) => ({ ...curr, [g.key]: !curr[g.key] }))}
                              />
                            </td>
                            <td>
                              <button className="icon-btn" type="button" onClick={() => setExpInst((curr) => ({ ...curr, [g.key]: !curr[g.key] }))}>
                                {expanded ? '▼' : '▶'}
                              </button>
                            </td>
                            <td>
                              <input className={`cell-input mono ${dup || blank ? 'err' : ''}`} value={g.gid} onChange={(e) => setOvrField(g.key, 'groupId', e.target.value)} />
                            </td>
                            <td>
                              <input className="cell-input" value={g.gname} onChange={(e) => setOvrField(g.key, 'groupName', e.target.value)} />
                            </td>
                            <td>
                              <span className="tpl-badge">{g.tpl.ref}</span>
                            </td>
                            <td className="num" style={{ textAlign: 'center' }}>{g.tpl.items.length}</td>
                            <td>{dup ? <span className="err-txt">⚠ Duplicate Group ID</span> : blank ? <span className="err-txt">⚠ Group ID required</span> : null}</td>
                          </tr>
                          {expanded && (
                            <tr className="child-row">
                              <td colSpan={7}>
                                {g.tpl.items.map((it) => {
                                  const d = findDevice(it.deviceKey)
                                  return (
                                    <div key={`${g.key}-${it.iid}`} className="child-line">
                                      <div>{`${g.gname} - ${it.friendly}`}</div>
                                      <div>{d ? d.subclass || '-' : '-'}</div>
                                      <div className="mono">{d ? `${d.make} ${d.model}` : ''}</div>
                                    </div>
                                  )
                                })}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="empty-block">No group instances yet.</div>
              )}
            </div>
          </section>
        </div>

        <aside className="utility-v2-right">
          <section className="panel preview-panel">
            <div className="panel-head">
              <span className="panel-title">4 · Live Preview</span>
              <span className="muted">{flatPreview.length ? `${flatPreview.length} devices` : 'Nothing to create yet'}</span>
            </div>
            <div className="table-wrap">
              {flatPreview.length > 0 ? (
                <>
                  <div className="panel-head thin">
                    <input className="txt" placeholder="Search preview..." value={pvSearch} onChange={(e) => setPvSearch(e.target.value)} />
                    <select className="txt" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}>
                      {[10, 25, 50].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button className="pg-btn" type="button" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                      ‹
                    </button>
                    <span className="muted">
                      {currentPage}/{pageCount}
                    </span>
                    <button className="pg-btn" type="button" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
                      ›
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th onClick={() => setPvSort((s) => ({ col: 'type', dir: s.col === 'type' ? -s.dir : 1 }))} className="sortable">
                          Type{pvSort.col === 'type' ? (pvSort.dir === 1 ? ' ▲' : ' ▼') : ''}
                        </th>
                        <th onClick={() => setPvSort((s) => ({ col: 'gid', dir: s.col === 'gid' ? -s.dir : 1 }))} className="sortable">
                          Group ID{pvSort.col === 'gid' ? (pvSort.dir === 1 ? ' ▲' : ' ▼') : ''}
                        </th>
                        <th onClick={() => setPvSort((s) => ({ col: 'name', dir: s.col === 'name' ? -s.dir : 1 }))} className="sortable">
                          Device Name{pvSort.col === 'name' ? (pvSort.dir === 1 ? ' ▲' : ' ▼') : ''}
                        </th>
                        <th onClick={() => setPvSort((s) => ({ col: 'sub', dir: s.col === 'sub' ? -s.dir : 1 }))} className="sortable">
                          Subclass{pvSort.col === 'sub' ? (pvSort.dir === 1 ? ' ▲' : ' ▼') : ''}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((r, i) => (
                        <tr key={`${r.gid}-${r.name}-${i}`} className={r.type === 'Parent' ? 'pv-parent-row' : 'pv-child-row'}>
                          <td className="num">{(currentPage - 1) * pageSize + i + 1}</td>
                          <td>{r.type}</td>
                          <td className="mono">{r.gid}</td>
                          <td>{r.name}</td>
                          <td>{r.sub}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {visiblePreview.length === 0 && <div className="empty-block">Nothing in preview.</div>}
                </>
              ) : (
                <div className="empty-block">Nothing in preview.</div>
              )}
            </div>
          </section>
        </aside>
      </div>

      <div className="create-bar">
        <div className={`ellip create-bar-status ${blockers.length ? 'error' : 'success'}`}>
          {blockers.length ? `⚠ ${blockers.join(' · ')}` : '✓ All validations passed — ready to create.'}
        </div>
        <div className="create-bar-actions">
          <div className="muted">
            {instances.length} parents · {instances.reduce((a, g) => a + g.tpl.items.length, 0)} children
          </div>
          <button className="btn-primary" type="button" disabled={!!blockers.length} onClick={() => setModal('createAll')}>
            Create All
          </button>
        </div>
      </div>

      {modal === 'manual' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add non-PPM device</h3>
            <div className="modal-grid">
              <label>
                Description
                <input className="modal-input" value={manual.desc} onChange={(e) => setManual((m) => ({ ...m, desc: e.target.value, err: '' }))} />
              </label>
              <label>
                Make
                <input className="modal-input" value={manual.make} onChange={(e) => setManual((m) => ({ ...m, make: e.target.value, err: '' }))} />
              </label>
              <label>
                Model
                <input className="modal-input" value={manual.model} onChange={(e) => setManual((m) => ({ ...m, model: e.target.value, err: '' }))} />
              </label>
              <label>
                Sub-class
                <select className="modal-input" value={manual.subclass} onChange={(e) => setManual((m) => ({ ...m, subclass: e.target.value, err: '' }))}>
                  <option value="">- select -</option>
                  {SUBCLASSES.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  className="modal-input"
                  value={manual.qty}
                  onChange={(e) => setManual((m) => ({ ...m, qty: Math.max(1, Number(e.target.value) || 1), err: '' }))}
                />
              </label>
            </div>
            {!!manual.err && <div className="err-txt">⚠ {manual.err}</div>}
            <div className="modal-actions">
              <button className="btn-cancel" type="button" onClick={() => setModal('')}>
                Cancel
              </button>
              <button className="btn-modal-primary" type="button" onClick={addManual}>
                Add device
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'override' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Enable quantity override?</h3>
            <div className="ovr-warning">
              ⚠ Overriding the PPM quantity may result in a mismatch between the quantity of assets registered in EAM and the project device quantity.
            </div>
            <p className="ovr-body">
              Allow <b>{overrideDevice ? overrideDevice.desc : ''}</b> to be used beyond its PPM quantity of{' '}
              <b>{overrideDevice ? (overrideDevice.omitted ? 0 : overrideDevice.ppmQty) : 0}</b>. No override
              amount is set — the Remaining column simply shows a negative value to communicate the overage.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" type="button" onClick={() => setModal('')}>
                Cancel
              </button>
              <button
                className="btn-danger"
                type="button"
                onClick={() => {
                  updDevice(ovrKey, { ovrOn: true })
                  setModal('')
                  showToast('Quantity override enabled.', 'warn')
                }}
              >
                Enable override
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'renumber' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Renumber Group IDs</h3>
            <p>
              Applies to the <b>{selectedCount} selected</b> instance(s) only, in list order. Other rows keep their
              current Group IDs.
            </p>
            <div className="modal-grid two">
              <label>
                Prefix
                <input
                  className="modal-input mono"
                  placeholder="e.g. A-GF-"
                  value={ren.prefix}
                  onChange={(e) => setRen((r) => ({ ...r, prefix: e.target.value }))}
                />
              </label>
              <label>
                Suffix
                <input
                  className="modal-input mono"
                  placeholder="optional"
                  value={ren.suffix}
                  onChange={(e) => setRen((r) => ({ ...r, suffix: e.target.value }))}
                />
              </label>
              <label>
                Start at
                <input type="number" min="0" className="modal-input" value={ren.start} onChange={(e) => setRen((r) => ({ ...r, start: Math.max(0, Number(e.target.value) || 0) }))} />
              </label>
              <label>
                Increment
                <input type="number" min="1" className="modal-input" value={ren.inc} onChange={(e) => setRen((r) => ({ ...r, inc: Math.max(1, Number(e.target.value) || 1) }))} />
              </label>
              <label>
                Digits
                <select className="modal-input" value={ren.pad} onChange={(e) => setRen((r) => ({ ...r, pad: Number(e.target.value) }))}>
                  <option value={2}>2 (01)</option>
                  <option value={3}>3 (001)</option>
                  <option value={4}>4 (0001)</option>
                </select>
              </label>
            </div>
            <div className="ren-preview">
              Preview: <span className="mono">{renEx(0)}, {renEx(1)}, {renEx(2)} ...</span>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" type="button" onClick={() => setModal('')}>
                Cancel
              </button>
              <button className="btn-modal-primary" type="button" onClick={applyRenumber}>
                Renumber
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'createAll' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Create all devices ?</h3>
            <p>
              This will submit {instances.length} parent instances and{' '}
              {instances.reduce((a, g) => a + g.tpl.items.length, 0)} children.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" type="button" onClick={() => setModal('')}>
                Cancel
              </button>
              <button className="btn-modal-primary" type="button" onClick={createAll}>
                Create All
              </button>
            </div>
          </div>
        </div>
      )}

      {!!toast && <div className={`toast ${toast.kind === 'warn' ? 'warn' : 'success'}`}>{toast.msg}</div>}
    </div>
  )
}

export default UtilityPage
