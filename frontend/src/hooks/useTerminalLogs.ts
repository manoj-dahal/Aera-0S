/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { useState } from 'react';
export const useTerminalLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (log: string) => setLogs(prev => [...prev, log]);
  return { logs, addLog };
};