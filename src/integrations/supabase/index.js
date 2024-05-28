import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize QueryClient
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Define types based on openapi.json
/**
 * @typedef {Object} Event
 * @property {number} id
 * @property {string} created_at
 * @property {string} name
 * @property {string} date
 * @property {string} description
 * @property {number} venue_id
 * @property {Venue} venue
 * @property {Comment[]} comments
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} created_at
 * @property {string} content
 * @property {number} event_id
 * @property {Event} event
 */

/**
 * @typedef {Object} Venue
 * @property {number} id
 * @property {string} name
 * @property {string} location
 * @property {string} description
 * @property {string} created_at
 * @property {string} updated_at
 * @property {Event[]} events
 */

// EXAMPLE HOOKS SECTION

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*, venue:venues(*), comments:comments(*)')),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};