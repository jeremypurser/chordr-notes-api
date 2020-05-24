import makeNotesController from '../core/UseCases/notesController';
import postgresAdapter from '../models/notesPostgres';

export default makeNotesController(postgresAdapter);
