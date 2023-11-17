import { TemplateType } from '../dto/template.dto';
import eegTemplate from './eeg/template.tex';
import eegModel from './eeg/template.cls';
import consultationTemplate from './consultation/template.tex';
import consultationModel from './consultation/template.cls';

export const TEMPLATE_MAP = {
  [TemplateType.EEG]: {
    tex: eegTemplate,
    cls: eegModel,
  },
  [TemplateType.CONSULTATION]: {
    tex: consultationTemplate,
    cls: consultationModel,
  },
  [TemplateType.PRESCRIPTION]: {
    tex: eegTemplate,
    cls: eegModel,
  },
};
