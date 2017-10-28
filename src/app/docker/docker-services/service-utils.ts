import {ServiceUpdateStatus} from '../client/domain/service-update-status';

export class ServiceUtils {

  static isUpdateInProgress(updateStatus: ServiceUpdateStatus): boolean {
    if (updateStatus == null) {
      return false;
    }
    switch (updateStatus.State) {
      case 'updating':
      case 'rollback_started':
        return true;
      default:
        return false;
    }
  }


  static isUpdateCompleted(updateStatus: ServiceUpdateStatus): boolean {
    if (updateStatus == null) {
      return false;
    }
    switch (updateStatus.State) {
      case 'completed':
      case 'rollback_completed':
        return true;
      default:
        return false;
    }
  }


  static isUpdateInError(updateStatus: ServiceUpdateStatus): boolean {
    if (updateStatus == null) {
      return false;
    }
    switch (updateStatus.State) {
      case 'paused':
        return true;
      default:
        return false;
    }
  }
}
