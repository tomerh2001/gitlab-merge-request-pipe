/* eslint-disable new-cap */
import pino from 'pino';
import PinoPretty from 'pino-pretty';

/**
 * A logger instance created using the Pino logging library with pretty-printing enabled.
 * @remarks
 * This logger is used to log messages related to GitLab merge request pipeline.
 * @example
 * logger.info('Starting merge request pipeline');
 */
export const logger = pino(PinoPretty({ignore: 'pid,hostname'}));
