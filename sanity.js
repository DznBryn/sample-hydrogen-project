import { createClient } from '@sanity/client';
import { definePreview } from '@sanity/preview-kit';

export const projectId = 'mstl3bgb';
export const dataset = 'production';
export const apiVersion = '2023-03-20';

export const client = createClient({ projectId, dataset, apiVersion, useCdn: false });
export const usePreview = definePreview({ projectId, dataset });