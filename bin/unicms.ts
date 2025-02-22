#!/usr/bin/env node

import { ensureEnvVariables } from '@/lib/util/env';
import dotenv from 'dotenv';

dotenv.config();
ensureEnvVariables();

import("../src/cli");
