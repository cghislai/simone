export interface MemoryStats {
  'stats': {
    'total_pgmajfault': number,
    'cache': number,
    'mapped_file': number,
    'total_inactive_file': number,
    'pgpgout': number,
    'rss': number,
    'total_mapped_file': number,
    'writeback': number,
    'unevictable': number,
    'pgpgin': number,
    'total_unevictable': number,
    'pgmajfault': number,
    'total_rss': number,
    'total_rss_huge': number,
    'total_writeback': number,
    'total_inactive_anon': number,
    'rss_huge': number,
    'hierarchical_memory_limit': number,
    'total_pgfault': number,
    'total_active_file': number,
    'active_anon': number,
    'total_active_anon': number,
    'total_pgpgout': number,
    'total_cache': number,
    'inactive_anon': number,
    'active_file': number,
    'pgfault': number,
    'inactive_file': number,
    'total_pgpgin': number
  },
  'max_usage': number,
  'usage': number,
  'failcnt': number,
  'limit': number
}