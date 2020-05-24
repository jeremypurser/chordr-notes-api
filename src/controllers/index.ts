import makeNotesController from '../core/UseCases/notesController';
import makePostgresAdapter from '../models/notesPostgres';

export default makeNotesController(makePostgresAdapter);
