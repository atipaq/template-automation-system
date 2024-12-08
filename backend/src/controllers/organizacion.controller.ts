// backend/src/controllers/organizacion.controller.ts
import { Request, Response } from 'express';
import * as organizacionService from '../services/organizacion.service';

export const createOrganizacion = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newOrganizacion = await organizacionService.createOrganizacion(data);
        res.status(201).json(newOrganizacion);
    } catch (error) {
        const err = error as Error; // Conversión explícita
        res.status(500).json({ error: err.message });
    }
};

export const getOrganizaciones = async (_req: Request, res: Response) => {
    try {
        console.log('Obteniendo todas las organizaciones');
        const organizaciones = await organizacionService.getOrganizaciones();
        res.status(200).json(organizaciones);
    } catch (error) {
        const err = error as Error; // Conversión explícita
        res.status(500).json({ error: err.message });
    }
};

export const getOrganizacionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organizacion = await organizacionService.getOrganizacionById(id);
        if (!organizacion) return res.status(404).json({ error: 'No encontrada' });
        res.status(200).json(organizacion);
    } catch (error) {
        const err = error as Error; // Conversión explícita
        res.status(500).json({ error: err.message });    }
};

export const updateOrganizacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedOrganizacion = await organizacionService.updateOrganizacion(id, data);
        res.status(200).json(updatedOrganizacion);
    } catch (error) {
        const err = error as Error; // Conversión explícita
        res.status(500).json({ error: err.message });    
    }
};

export const deleteOrganizacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await organizacionService.deleteOrganizacion(id);
        res.status(204).send();
    } catch (error) {
        const err = error as Error; // Conversión explícita
        res.status(500).json({ error: err.message });    
    }
};

export const getMainOrganization = async (_req: Request, res: Response) => {
    try {
        console.log('Intentando obtener la organización principal (código: ORG-MAIN)');
        const mainOrganization = await organizacionService.getMainOrganization();

        if (!mainOrganization) {
            console.error('No se encontró la organización principal en la base de datos.');
            return res.status(404).json({ error: 'No encontrada' });
        }

        console.log('Organización principal encontrada:', mainOrganization);
        res.json(mainOrganization);
    } catch (error) {
        console.error('Error al obtener la organización principal:', error);
        res.status(500).json({ error: 'Error al obtener la organización principal.' });
    }
};
