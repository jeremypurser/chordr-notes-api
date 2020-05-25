import ChordrNotesController from '../core/UseCases/notesController';
import postgresAdapter from '../models/notesPostgres';

export default new ChordrNotesController(postgresAdapter);
