/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import { useState } from 'react';
export const useAeraState = () => {
  const [state, setState] = useState('idle');
  return { state, setState };
};