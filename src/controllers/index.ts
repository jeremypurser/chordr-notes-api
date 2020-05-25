import NotesController from '../core/UseCases/notesController';
import postgresAdapter from '../models/notesPostgres';

export default NotesController.from(postgresAdapter);
