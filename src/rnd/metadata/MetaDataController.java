package rnd.metadata;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import rnd.util.IOUtils;

/**
 * @author Vinod Pahuja
 * 
 */

// @Named
// @RequestScoped
// @WebServlet(asyncSupported = true, urlPatterns = "/metadata")
public class MetaDataController extends HttpServlet {

	private static final long serialVersionUID = -1514025477286265688L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//String REPO_BASE_PATH = "metadata";
		//String REPO_BASE_PATH = "F:/Source/Appy/store/metadata";
		String REPO_BASE_PATH = getServletContext().getRealPath("metadata");
		
		String metaDataPath = REPO_BASE_PATH;

		String requestURI = request.getRequestURI();
		String[] args = requestURI.split("/");
		
		if(args[2].equals("metadata")) {
			metaDataPath = metaDataPath + requestURI.substring(requestURI.indexOf("metadata") + 8);
		} else {
			metaDataPath = metaDataPath + requestURI.substring(requestURI.indexOf("store") + 8);
		}
		
		String metaData = IOUtils.readPlainContent(metaDataPath);
		response.getWriter().append(metaData);
		response.setHeader("Access-Control-Allow-Origin", "*");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}