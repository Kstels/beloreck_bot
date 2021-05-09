import {WelcomeFlow} from './welcome.flow';
import {TasksFlow} from './tasks.flow';

export enum FlowType {
    WELCOME_FLOW = 'welcomeFlow',
    TASKS_FLOW = 'taskFlow',
}

export const FLOWS_MAP: Record<FlowType, any> = {
    [FlowType.WELCOME_FLOW]: WelcomeFlow,
    [FlowType.TASKS_FLOW]: TasksFlow,
};
