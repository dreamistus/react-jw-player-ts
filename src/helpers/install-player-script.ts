type InstallPlayerScriptArgs = {
  context: Document;
  onLoadCallback: VoidFunction;
  scriptSrc: string;
  uniqueScriptId: string;
};

function installPlayerScript({ 
  context, 
  onLoadCallback, 
  scriptSrc, 
  uniqueScriptId }: InstallPlayerScriptArgs
): HTMLScriptElement {
  const jwPlayerScript = context.createElement('script');
  jwPlayerScript.id = uniqueScriptId;
  jwPlayerScript.src = scriptSrc;
  jwPlayerScript.onload = onLoadCallback;

  return context.head.appendChild(jwPlayerScript);
}

export default installPlayerScript;
