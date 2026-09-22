var p207SavedConfig = {};
try { p207SavedConfig = JSON.parse((typeof localStorage !== 'undefined' && localStorage.getItem('p207_api_config_v1')) || '{}') || {}; } catch (e) {}
window.AB_CONFIG = {
  studyKey: 'p2-07-campus-push-time-v1',
  apiBase: p207SavedConfig.apiBase || '',
  allowPreviewOverride: true
};
