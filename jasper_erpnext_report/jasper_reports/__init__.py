import os, logging, frappe
import jasper_erpnext_report as jr

_logger = logging.getLogger(frappe.__name__)

try:
	import jnius_config as jc
	jr.pyjnius = True

	if not jc.vm_running:
		jc.add_options('-Djava.awt.headless=true')
	else:
		_logger.info("jasper_reports __init__ vm_running {}".format(jc.vm_running))
except:
	jr.pyjnius = False

norm_path = os.path.normpath
join_path = os.path.join
dirname = os.path.dirname
parent_path = dirname(dirname(__file__))
rel_path = os.path.relpath(os.path.join(parent_path, "java"),dirname(__file__))
rel_path_curr = os.path.relpath(parent_path, os.getcwd())
os.environ['CLASSPATH'] = os.environ['CLASSPATH'] + ":" +norm_path(join_path(parent_path,"java/lib/*")) + ":."

try:
	from jnius import autoclass

	def getJavaClass(jclass):
		return autoclass(jclass)

	HashMap = getJavaClass('java.util.HashMap')
	String = getJavaClass('java.lang.String')
	Integer = getJavaClass('java.lang.Integer')
	ArrayList = getJavaClass('java.util.ArrayList')

	ReportCompiler = getJavaClass('ReportCompiler')

	ExportReport = getJavaClass('ExportReport')
	jr.pyjnius = True
	print "pyjnius is ok 4: {}".format(jr.pyjnius)
except:
	jr.pyjnius = False