/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Lua for dynamic variable blocks.
 */

/** @suppress {extraRequire} */


// Lua is dynamically typed.
Lua['variables_get_dynamic'] = Lua['variables_get'];
Lua['variables_set_dynamic'] = Lua['variables_set'];
